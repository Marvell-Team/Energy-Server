var productServices = require("../services/productServices");
var productModel = require ("../models/productModel");
exports.getListProduct = async function getListProduct() {
  return await productServices.getListProduct();
};

exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};

exports.addNew = async function addNewProduct(params, res) {
  let { nameProduct, price, imgProduct, material, idType } = params;
  const modelProduct = new productModel({
    nameProduct: nameProduct,
    price: price,
    imgProduct: imgProduct,
    material: material,
    idType: idType,

  })
  // Tạo mới một sản phẩm
  await productServices.addNew(modelProduct, res);
};

exports.edit = async function editProduct(id, params) {
  let { nameProduct, price, imgProduct, material, idType } = params;
  let products = {
    id,
    nameProduct,
    price,
    imgProduct,
    material,
    idType,
  };
  await productServices.edit(products);
};

exports.remove = function removeProductById(id) {
  productServices.remove(id);
};
