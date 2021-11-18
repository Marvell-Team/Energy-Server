
const likeModel = require("../models/likeModel");
var likeServices = require("../services/likeServices");
exports.addLiker = async function addLiker( params) {
  
    let { id_user, id_product } = params;
  if(id_product===undefined || id_user===undefined){
    return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
  }else{
    const likeModels = new likeModel({
        id_user: id_user,
        id_product: id_product,
    })
    // Tạo mới một sản phẩm
  return await likeServices.add(likeModels,params);
  }
      
  };

  exports.getStore = async function getStore() {
    return await storeServices.getStore();
  };
  exports.getStoreById = async function getStoreById(id) {
    return await storeServices.getStoreById(id);
  };