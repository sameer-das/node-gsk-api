const puppeteer = require('puppeteer');
const { getHtml } = require('../utils/html-generator');
const path = require('path');


const getPdf = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        if (!userid) {
            res.status(404).json({ status: 400, message: 'userid not found', result: [] });
        }
        const path = await checkForIcard(req, userid);
        res.download(path);
    } catch (e) {
        next(e);
    }
}

const checkForIcard = async (req, userId) => {
    const query = `select User_Type_ID from  dbo.User_Master where User_ID = ${userId}`;
    const result = await req.app.locals.db.query(query);
    const record = result.recordset[0];
    if(!record) {
        throw new Error('User details not found for provided user id.');
    }
    if(record.User_Type_ID !== 2) {
        throw new Error(`Invalid user type:${record.User_Type_ID} for ID card generation.`);
    } else {
        // check for id card present or not
        selectQuery = `select Avail,Icard_Path from dbo.User_Icard_Details where User_ID = ${userId}`;
        const selectResult = await req.app.locals.db.query(selectQuery);
        const selectRecord = selectResult.recordset[0];
        if (!selectRecord || selectRecord?.Avail === 'N') {
            const path = await generatePdf(req, userId);
            return path;
        } else {
            return selectRecord?.Icard_Path;
        }
    }
}


const generatePdf = async (req, userId) => {
    const query = `select um.User_ID, um.Login_Code, User_FName, User_LName, Passport_Photo  from dbo.User_Master um 
    inner join dbo.User_Personal_Details upd on um.User_ID = upd.User_ID
    left join dbo.User_KYC_Details ukd on um.User_ID = ukd.User_ID where um.User_ID = ${userId}`;
    const result = await req.app.locals.db.query(query);
    const record = result.recordset[0];
    const icard_file_name = `${record.Login_Code}_${record.User_FName}_${record.User_LName}.pdf`
    const pathname = path.join(__dirname, '..', '..', 'pdfs', icard_file_name);
    await convertToPdf(record, pathname);
    // insert into the table    
    const insertQuery = `insert into dbo.User_Icard_Details (User_ID, Icard_Path, Avail) values (${userId},'${pathname}', 'Y')`
    await req.app.locals.db.query(insertQuery);
    return pathname;
}


const convertToPdf = async (record, pdfPath, margin = { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm', }) => {
    const htmlContent = await getHtml(record);
    // const htmlContent =  record;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });
    await page.pdf({ path: pdfPath, format: 'A4', margin: margin, printBackground: true });
    await browser.close();
    console.log('Generated ==== ' + pdfPath);
}


module.exports = {
    getPdf
}