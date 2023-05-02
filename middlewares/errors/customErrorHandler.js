const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if(err.code === 11000){
    //Duplicate Key Error
    customError = new CustomError("Duplicate Key Found: Check your input", 400);
  }
  if(err.name === "CastError"){
    customError = new CustomError("Please provide a valid id",400);
  }

  // console.log(customError.name, customError.message, customError.status);

  res
    .status(customError.status || 500) //400 = bad request
    .json({
      success: false,
      message: customError.message
    });
};
module.exports = customErrorHandler;
