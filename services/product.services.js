const Product = require("../models/Product");

// product queries ,select filter & full flexibilities
exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);
  return products;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // console.log(data.ids, data.data);
  // const result = await Product.updateMany({_id: data.ids }, data.data, {
  //     runValidators: true
  // });
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
