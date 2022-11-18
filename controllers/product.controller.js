exports.getProducts = async(req,res, next) => {

    try {
  const products = await Product.where("name").equals("hfh").where("quantity").gt(100)
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
  
      const result = await Product.create(req.body)
  
    result.logger()
  // const product = new Product(req.body)
  
  // const result = await product.save()
  
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