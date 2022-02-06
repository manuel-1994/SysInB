const Products = require("../services/products.service");

const validateProduct = async (req,res,next, param="code",validate=true) =>{
  const productService = new Products();
  const product = await productService.getData({[param]: req.body[param]})
 
  if(product){
    const query = {
      code: "El codigo del producto ya existe",
      name: "El nombre del producto ya existe"
    }
    return res.status(400).json({
      success: false,
      message: query[param]
    });
  };
  if(validate){return validateProduct(req,res,next,"name", false)};
  
  next();
}

module.exports = validateProduct;
