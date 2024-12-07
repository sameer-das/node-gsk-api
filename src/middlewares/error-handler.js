const { getErrorMessage } = require('../utils/utils');

// import CustomError from "../errors/CustomError";

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        next(error);
        return;
    }

    res.status(500).json({
        error: {
            message:
                getErrorMessage(error) ||
                "An error occurred. Please view logs for more details",
        },
    });
}


module.exports = errorHandler;