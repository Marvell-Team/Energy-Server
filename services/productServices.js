
var ProductModel = require("../models/productModel");



var ImageModel = require("../models/imageModel");
const likeModel = require("../models/likeModel");
const productModel = require("../models/productModel");

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
     let mysort  ={'avg_vote':-1}
     let productt = await ProductModel.find().populate('id_image').exec();
 
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
    
    let productt = await ProductModel.findById(id).populate('id_image').populate({path:'avg_vote',options:{sort:{'countLiker':-1}}}).exec();
    if(productt ){
      console.log(productt.avg_vote.liker.length)
    return {status:1,data:{productt,liker:productt.avg_vote.liker.length}}
  }else{
    return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
  }
  } catch (error) {
    return {status:-1,error:error}
  }
};


exports.addNew = async function addNewProduct(products) {
  let { id_category, id_image, nameProduct, price_product, quantity_product,description_product,chip_product ,rom_product ,ram_product,camera_late_product,pin_product} = products;
  const likerModel =new likeModel({
    liker:[],
  })
  const like= await likerModel.save();
  if( id_category ===undefined || id_image ===undefined || nameProduct ===undefined || price_product ===undefined || quantity_product ===undefined || like._id ===undefined ){
    return {status:-1,error:'Không tìm thấy dữ liệu truyền vào'}
  }else{
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
      avg_vote:like._id,
    })
    let saveServices = await modelProduct.save();
    if(saveServices){
      return  {status:1,data:saveServices}
    }
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
