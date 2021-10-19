var productServices = require("../services/productServices");
var productModel = require ("../models/productModel");
var imageModel=require ("../models/imageModel");
exports.getListProduct = async function getListProduct() {
  return await productServices.getListProduct();
};

exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};

exports.addNew = async function addNewProduct(params, res) {
  let { id_category, id_image, name_product, price_product, quantity_product,description_product } = params;
  const modelProduct = new productModel({
    name_product: name_product,
    price_product: price_product,
    description_product:description_product,
    avg_vote:0,
    quantity_product: quantity_product,
    id_image: id_image,
    id_category:id_category,
  })
  // Tạo mới một sản phẩm
  return await productServices.addNew(modelProduct, res);
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

exports.addImage = async function addImageProduct(params, res) {
 
  const modelImage = new imageModel({
    nameImage:params.nameImage,
  })
  // Tạo mới một sản phẩm
  return await productServices.addImage(modelImage, res);
};
