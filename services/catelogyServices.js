var CategoryModel = require("../models/categoryModel");
exports.getListCategories = async function getListCategories() {
  return await CategoryModel.find();
};

exports.getCategoryById = async function getCategoryById(id) {
  let categorii = await CategoryModel.findById(id);
  // Categorys = { ...Categorys, id: Categorys._id };
  return categorii;
};
exports.getListCategoriesbyCategorys = async function getListCategoriesbyCategorys(categorys) {
  try {
    let categorii = await CategoryModel.find({categorys:categorys});
    console.log(categorii)
    return {status:1,data:categorii};
  } catch (error) {
    return {status:-1,error:'Không lấy được dữ liệu'};
  }
};
exports.addCategory= async function addNewCategory(categories, res) {
  let saveServices = await categories.save();
  if(saveServices){
    res.redirect("/category");
  }
};
