const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500
    
    return res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
  
  module.exports = {
    errorHandler,
  }