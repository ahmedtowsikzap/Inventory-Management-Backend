const Product = require('../models/Product')


exports.getProductsService = async()=> {
    const products = await Product.find({})
    return products
}


exports.createProductService = async(data)=> {
    const product =  await Product.create(data)
    return product

}

exports.updateProductService = async (productId,data) => {

    const result = await Product.updateOne({_id: productId}, { $set : data}, { runValidators: true});
    return result
}

exports.bulkUpdateProductService = async (data)=> {
    const result = await Product.updateMany({_id: data.ids }, data, {
        runValidators: true
    });
    return result
}