var productServices = require("../services/productServices");
var productModel = require("../models/productModel");
var imageModel = require("../models/imageModel");
exports.getListProduct = async function getListProduct(params) {
  return await productServices.getListProduct(params);
};
exports.getListProductLSR = async function getListProductLSR(body) {
  return await productServices.getListProductLSR(body);
};
exports.getListLikeProduct = async function getListLikeProduct() {
  return await productServices.getListLikeProduct();
};
exports.getListProductByCategory = async function getListProductByCategory(
  categorys,
  body
) {
  return await productServices.getListProductByCategory(categorys, body);
};

exports.getListProductByIdCategorys =
  async function getListProductByIdCategorys(id, body) {
    return await productServices.getListProductByIdCategorys(id, body);
  };
exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};
exports.getProductByStore = async function getProductByStore(id) {
  return await productServices.getProductByStore(id);
};

exports.addNew = async function addNewProduct(params) {
  // Tạo mới một sản phẩm
  return await productServices.addNew(params);
};

exports.edit = async function editProduct(id, params) {
  let {
    nameProduct,
    price_product,
    id_category,
    stock,
    chip_product,
    avg_vote,
    description_product,
    quantity_product,
    nameImage,
    rom_product,
    ram_product,
    camera_late_product,
    pin_product,
  } = params;
  let products = {
    id,
    nameProduct,
    price_product,
    id_category,
    quantity_product,
    description_product,
    stock,
    avg_vote,
    nameImage,
    chip_product,
    ram_product,
    rom_product,
    camera_late_product,
    pin_product,
  };
  return await productServices.edit(products);
};

exports.remove = async function removeProductById(id) {
  return await productServices.remove(id);
};

exports.addImage = async function addImageProduct(nameImage) {
  const modelImage = new imageModel({
    nameImage: nameImage,
  });
  // Tạo mới một sản phẩm
  return await productServices.addImage(modelImage);
};
