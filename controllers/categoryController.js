var categoryModel = require('../models/categoryModel');
var categoryServices = require('../services/catelogyServices')

exports.getListCategories = async function getListCategories(){
    return await categoryServices.getListCategories()
};
exports.getListCategoriesbyCategorys = async function getListCategoriesbyCategorys(categorys){
  return await categoryServices.getListCategoriesbyCategorys(categorys)
};

exports.addCategory = async function addNewCategory(params, res) {
    let { name_category ,categorys} = params;
    const modelCategory = new categoryModel({
      name_category: name_category,
      categorys:categorys,
    })
    // Tạo mới một sản phẩm
    await categoryServices.addCategory(modelCategory, res);
  };
  exports.addCategoryBy = async function addCategoryBy(params, res) {
    return await categoryServices.getListCategories()
  };