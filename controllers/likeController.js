
const likeModel = require("../models/likeModel");
var likeServices = require("../services/likeServices");
exports.statusLike = async function statusLike(params) {
  return await likeServices.statusLike(params);
};

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
  exports.removelike = async function removelike(id) {
    return await likeServices.remove(id);
  };
 