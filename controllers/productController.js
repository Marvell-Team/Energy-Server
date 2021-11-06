var productServices = require("../services/productServices");
var productModel = require ("../models/productModel");
var imageModel=require ("../models/imageModel");
exports.getListProduct = async function getListProduct() {
  return await productServices.getListProduct();
};
exports.getListProductByCategory = async function getListProductByCategory(categorys) {
  return await productServices.getListProductByCategory(categorys);
};

exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};

exports.addNew = async function addNewProduct(params, res) {
  let { id_category, id_image, nameProduct, price_product, quantity_product,description_product,chip_product ,rom_product ,ram_product,camera_late_product,pin_product} = params;
  const modelProduct = new productModel({
    nameProduct: nameProduct,
    price_product: price_product,
    description_product:
    {
      description_product:description_product,
      chip:chip_product,
      ram:ram_product,
      rom:rom_product,
      camera_late:camera_late_product,
      pin:pin_product,
    },
    quantity_product: quantity_product,
    id_image: id_image,
    id_category:id_category,
    stock:quantity_product>0?true: false,
    avg_vote:0,
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
