var productServices = require("../services/productServices");
var productModel = require ("../models/productModel");
var imageModel=require ("../models/imageModel");
exports.getListProduct = async function getListProduct() {
  return await productServices.getListProduct();
};
exports.getListLikeProduct = async function getListLikeProduct() {
  return await productServices.getListLikeProduct();
};
exports.getListProductByCategory = async function getListProductByCategory(categorys) {
  return await productServices.getListProductByCategory(categorys);
};

exports.getListProductByIdCategorys = async function getListProductByIdCategorys(id) {
  return await productServices.getListProductByIdCategorys(id);
};
exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};

exports.addNew = async function addNewProduct(params) {
  // Tạo mới một sản phẩm
  return await productServices.addNew(params);
};

exports.edit = async function editProduct(id, params) {
  let { nameProduct, price, id_category, stock, avg_vote , description_product ,quantity_product,nameImage } = params;
  let products = {
    id,
    nameProduct,
    price,
    id_category,
    quantity_product,
    description_product,
    stock,
    avg_vote,
    nameImage
  };
  return await productServices.edit(products);
};

exports.remove = async function removeProductById(id) {
  return await productServices.remove(id);
};

exports.addImage = async function addImageProduct(nameImage) {
 
  const modelImage = new imageModel({
    nameImage:nameImage,
  })
  // Tạo mới một sản phẩm
  return await productServices.addImage(modelImage);
};
