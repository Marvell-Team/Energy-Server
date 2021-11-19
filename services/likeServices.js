var likeModel = require("../models/likeModel");
const productModel = require("../models/productModel");

exports.add = async function addLike(likeModels,params) {
    let { id_user, id_product } = params;
    await likeModels.save();
    const likes = await likeModel.find({id_product:id_product});
    const product = await productModel.findById(id_product)
    if(product){
        product.avg_vote=likes.length!==undefined?(likes.length):(product.avg_vote);
      }
      await product.save();
    return {status: 1, data:product}  
};
exports.remove = async function removeLike(id) {
  console.log('idaa'+id)
  const remove=await likeModel.deleteOne({_id:id});
  return {status: 1, data:remove}  
};
exports.statusLike = async function statusLike(params) {
  let { id_user, id_product } = params;
  const like= await likeModel.findOne({id_user:id_user,id_product:id_product})
  return {status: 1, data:like}  
};

exports.getStore = async function getStore() {
  try {
    let store = await storeModel.find();
    return { status: 1, data:store};
  } catch (error) {
    return { status: -1, error: error };
  }
};
exports.getStoreById = async function getStoreById(id) {
  try {
    let store = await storeModel.findById(id);
    return { status: 1, data:store};
  } catch (error) {
    return { status: -1, error: error };
  }
};
