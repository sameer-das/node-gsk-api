const fs = require('fs');
const path = require('path');

const getHtml = async (details) => {

    const card_bg = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'card_bg.png')).toString('base64');
    const card_back = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'card_back.png')).toString('base64');
    const digi_safe_logo = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'digi_safe_logo.png')).toString('base64');
    const esk_logo = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'esk_logo.png')).toString('base64');

    const html = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Icard PDF</title>
        <style>
            .container {
                display: flex;
                /* min-height: 700px; */
                justify-content: center;
                align-items: center;
            }
    
            .icard-container {
                display: flex;
                flex-direction: column;
                width: 400px;
                height: 600px;
                gap: 1rem;
            }
    
            .icard-back {
                background-image: url("data:image/png;base64,${card_back}");
                background-repeat: no-repeat;
                background-size: contain;
                height:244px;    
            }
    
            .icard-front {
                background-image: url("data:image/png;base64,${card_bg}");
                background-repeat: no-repeat;
                background-size: contain;
                height:244px;
            }
    
            .icard-front-header {
                margin-top: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
    
            .icard-front-header img {
                width: 30%;
    
            }
            .icard-front-header img.digisafe-logo {
                margin-left: 2rem;
            }
            .icard-front-header img.esk-logo {
                margin-right: 2rem;
            }
    
            .icard-front-body {
                display: flex;
                height: 180px;
            }
    
            .icard-front-body .icard-front-body-data {
                flex: 0 0 50%;
                padding-left: 1rem;
                justify-content: center;
                display: flex;
                flex-direction: column;
            }
    
            .icard-front-body .icard-front-body-data p {
                padding: 0;
                margin: 0;
                color: #000;
                font-weight: 600;
                margin-bottom: 0.25rem;
                font-family: 'Roboto';
            }
            .icard-front-body .icard-front-body-data p span {
                color: #0e2b6c;
            }
    
            .icard-front-body-image {
                flex: 0 0 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .icard-front-body-image .user-icon {
                width: 115px;
                height: 115px;
                border-radius: 50%;
                border: 4px solid #0e2b6c;
                padding: 2px;
            }
    
            .icard-front-body-image p.esathi-text {
                color: #fff;
                margin-top: 0.25rem;
                margin-bottom: 0;
                font-size: 1.2rem;
                font-weight: 500;
                font-family: 'Roboto';
            }
    
        </style>
    </head>
    <body>
    
        <div class="container">
            <div class="icard-container">
    
                <div class="icard-front">
                    <div class="icard-front-header">
                        <img class="digisafe-logo" src="data:image/png;base64,${digi_safe_logo}" alt="digisafe logo" />
                        <img class="esk-logo" src="data:image/png;base64,${esk_logo}" alt="ESK logo" />
                    </div>
                    <div class="d-flex icard-front-body">
                        <div class="icard-front-body-data">
                            <p><span>NAME :</span> ${details.User_FName.toUpperCase()} ${details.User_LName.toUpperCase()}</p>
                            <p><span>ID :</span> ${details.Login_Code} </p>
                        </div>
                        <div class="icard-front-body-image">
                            <img 
                                src="https://api.esebakendra.com/api/User/Download?fileName=${details.Passport_Photo}" 
                                class="user-icon" 
                                alt="user image">
                            <p class="esathi-text">e-Sathi</p>
                        </div>
                    </div>
                </div>
            
                <div class="icard-back"></div>
        
            </div>
        </div>    
    </body>
    </html>`;

    return html;
}

module.exports = { getHtml }

