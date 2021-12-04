var storeModel = require("../models/storeModel");

exports.add = async function addStore(store) {
  let saveServices = await store
    .save()
    .then((data) => {
      return { status: 1, data: data };
    })
    .catch((err) => {
      return { status: -1, error: "Có lỗi gì đó xảy ra" };
    });
  return saveServices;
};
exports.getStore = async function getStore() {
  try {
    let store = await storeModel.find();
    return { status: 1, data: store };
  } catch (error) {
    return { status: -1, error: "Có lỗi gì đó xảy ra" };
  }
};
exports.editStore = async function editStore(body, id) {
  const { products } = body;
  try {
    let store = await storeModel.findById(id);
    if (store) {
      store.products = products;
      await store.save();
      return { status: 1, data: store };
    } else {
      return { status: -1, error: "Có lỗi gì đó xảy ra" };
    }
  } catch (error) {
    return { status: -1, error: "Có lỗi gì đó xảy ra" };
  }
};
exports.getStoreById = async function getStoreById(id) {
  try {
    let store = await storeModel.findById(id);
    return { status: 1, data: store };
  } catch (error) {
    return { status: -1, error: "Có lỗi gì đó xảy ra" };
  }
};
