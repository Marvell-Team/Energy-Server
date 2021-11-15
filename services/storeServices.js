var storeModel = require("../models/storeModel");

exports.add = async function addStore(store) {
    let saveServices = await store.save().then(data => {
        return {status:1,data:data};
      }).catch(err =>{
        return {status:-1,message:err};
      });
      return saveServices;
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
