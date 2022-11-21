const Product = require("../models/Product")
const { getProductsService, createProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("../services/product.services")

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
  
      const result = await createProductService(req.body);
      
  
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

  exports.updateProducts= async (req,res,next)=> {
        try {
         const {id} = req.params;
         const result = await updateProductService(id, req.body);
         res.status(200).json({
          status: "success",
          message: "succesfully updated the product"
        })
         } catch (error) {
          res.status(400)
          .json({
        
            status:"failed",
            message: "couldn't update the product",
            error: error.message
          })

         }

  }

  exports.bulkUpdateProduct= async (req,res,next)=> {
        try {
          console.log(req.body);
         const result = await bulkUpdateProductService(req.body);
         res.status(200).json({
          status: "success",
          message: "succesfully updated the product"
        })
         } catch (error) {
          res.status(400)
          .json({
        
            status:"failed",
            message: "couldn't update the product",
            error: error.message
          })

         }
  }

  exports.deleteProductById= async (req,res,next)=> {
    try {
      const {id} = req.params
     const result = await deleteProductByIdService(id);
     res.status(200).json({
      status: "success",
      message: "succesfully deleted the product!"
      
    })
     } catch (error) {
      res.status(400)
      .json({
    
        status:"failed",
        message: "couldn't update the product",
        error: error.message
      })

     }
}

exports.bulkDeleteProduct= async (req,res,next)=> {
  try {
    console.log(req.body);
   const result = await bulkDeleteProductService(req.body.ids);
   res.status(200).json({
    status: "success",
    message: "succesfully deleted the given product"
  })
   } catch (error) {
    res.status(400)
    .json({
  
      status:"failed",
      message: "couldn't deleted the choosen product",
      error: error.message
    })

   }
}