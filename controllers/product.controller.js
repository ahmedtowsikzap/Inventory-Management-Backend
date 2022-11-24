const Product = require("../models/Product")
const { getProductsService, createProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("../services/product.services")

exports.getProducts = async(req,res, next) => {

const filters = {...req.query}

// sort , page , limit >>>>> exclude

const excludeFields = ['sort', 'page', 'limit']

excludeFields.forEach(field=> delete filters[field])

const queries= []

if(req.query.sort){
  // price & quantity > 'price quantity'
  const sortBy = req.query.sort.split(',').join(' ')
  queries.sortBy = sortBy
  console.log(sortBy);
}

 const products = await getProductsService(filters, queries)
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
          message: "successfully updated the product"
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
          message: "successfully updated the product"
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
     
   if(!result.deletedCount){
    return res.status(400).json({

      status: "failed!",
      error: "couldn't delete the product"
    })
   }


     res.status(200).json({
      status: "success",
      message: "successfully deleted the product!"
      
    })
     } catch (error) {
      res.status(400)
      .json({
    
        status:"failed!",
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
    message: "successfully deleted the given product"
  })
   } catch (error) {
    res.status(400)
    .json({
  
      status:"failed",
      message: "couldn't deleted the chosen product",
      error: error.message
    })

   }
}