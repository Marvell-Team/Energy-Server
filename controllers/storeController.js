var storeModel = require("../models/storeModel");
var storeServices = require("../services/storeServices");
exports.AddStore = async function AddStore(params) {
  let { name_store, address_store } = params;
  if (name_store === undefined || address_store === undefined) {
    return { status: -1, message: "Không tìm thấy dữ liệu truyền vào" };
  } else {
    const modelStore = new storeModel({
      name_store: name_store,
      address_store: address_store,
      products: [],
    });
    // Tạo mới một sản phẩm
    return await storeServices.add(modelStore);
  }
};

exports.EditStore = async function EditStore(body, id) {
  return await storeServices.editStore(body, id);
};
exports.getStore = async function getStore() {
  return await storeServices.getStore();
};
exports.getStoreById = async function getStoreById(id) {
  return await storeServices.getStoreById(id);
};
