
var ProductModel = require("../models/productModel");



var ImageModel = require("../models/imageModel");

exports.getListProductByIdCategorys = async function getListProductByIdCategorys(id) {
  try {
    
     let productt = await ProductModel.find({id_category: id}).populate('id_image');
 
     if(productt){
     return {status:1,data:productt}
   }else{
     return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
   }
   } catch (error) {
     return {status:-1,error:error}
   }
 };
exports.getListProduct = async function getListProduct() {
 try {
   
    let productt = await ProductModel.find().populate('id_image');

    if(productt){
    return {status:1,data:productt}
  }else{
    return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
  }
  } catch (error) {
    return {status:-1,error:error}
  }
};
exports.getListLikeProduct = async function getListLikeProduct() {
  try {
     let mysort  ={avg_vote:-1}
     let productt = await ProductModel.find().sort(mysort).populate('id_image');
 
     if(productt){
     return {status:1,data:productt}
   }else{
     return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
   }
   } catch (error) {
     return {status:-1,error:error}
   }
 };
exports.getListProductByCategory = async function getListProductByCategory(categorys) {

  try {
    
     let productt = await ProductModel.find().populate({path:'id_category',match: {
      categorys:categorys
    }}).populate('id_image').exec();
 
     if(productt ){
     return {status:1,data:productt}
   }else{
     return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
   }
   } catch (error) {
     return {status:-1,error:error}
   }
 };

exports.getProductById = async function getProductById(id) {
  try {
    
    let productt = await ProductModel.findById(id).populate('id_image').exec();

    if(productt ){
    return {status:1,data:productt}
  }else{
    return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
  }
  } catch (error) {
    return {status:-1,error:error}
  }
};


exports.addNew = async function addNewProduct(products, res) {
  let saveServices = await products.save();
  if(saveServices){
    return saveServices
  }
};

exports.addImage = async function addNewImage(image, res) {
  let saveServices = await image.save();
  if(saveServices){
    return saveServices
  }
};

exports.edit = async function editProduct(products) {
  let productEdit = await ProductModel.findById(products.id)
  console.log('tgtgtg',productEdit);
  if(productEdit){
    productEdit.nameProduct = products.nameProduct;
    productEdit.price = products.price;
    if (products.imgProduct) {
      productEdit.imgProduct = products.imgProduct;
    }
    productEdit.material = products.material;
    productEdit.idType = products.idType;

  }
  await productEdit.save()
};

exports.remove = async function removeProductById(id) {
  let productRemove = await ProductModel.findByIdAndRemove(id)
  return await productRemove;
};
