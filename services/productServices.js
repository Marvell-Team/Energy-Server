
var ProductModel = require("../models/productModel");



var ImageModel = require("../models/imageModel");

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
exports.getListProductByCategory = async function getListProductByCategory() {
  try {
    
     let productt = await ProductModel.find().or([{ id_category: '61751444be6eb74ad81eda10' }]).populate({path:'id_category'});
 
     if(productt){
     return productt
   }else{
     return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
   }
   } catch (error) {
     return {status:-1,error:error}
   }
 };

exports.getProductById = async function getProductById(id) {
  let productt = await ProductModel.findById(id);
  // productt = { ...productt, id: productt._id };
  return productt;
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
