const validateData = (data) =>{
  return (req,res,next)=>{
    const validateData = data.validate(req.body);
    if(validateData.error){
      return res.status(400).json({
        data:validateData.value, 
        success:false, 
        message: validateData.error.details[0].message});
    };
    return next();
  }
}

module.exports = validateData