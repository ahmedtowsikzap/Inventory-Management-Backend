const { getProductsService, createProductService } = require("../services/product.services")

exports.getProducts = async(req,res, next) => {
 const products = await getProductsService()
    try {
  res.status(200).json({
    status: "success",
    data: products
  })
    } catch(error){
  res.status(400).json({
    status: "fail",
    error: error.message,
    message: "can not get data"
  })
  
    }
  }

  exports.createProduct = async (req,res, next) => {

    try{
  
      const result = await createProductService(req.body)
  
    result.logger()

      res.status(200)
      .json({
      status: "success",
      message: "data inserted successfully",
      data: result
  })
    }catch(error){
    res.status(400)
    .json({
  
      status:"failed",
      message: "Data is not inserted",
      error: error.message
    })
  
    }
    
  }