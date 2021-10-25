var categoryModel = require('../models/categoryModel');
var categoryServices = require('../services/catelogyServices')

exports.getListCategories = async function getListCategories(){
    return await categoryServices.getListCategories()
};

exports.addCategory = async function addNewCategory(params, res) {
    let { name_category ,categorys} = params;
    const modelCategory = new categoryModel({
      name_category: name_category,
      categorys:categorys
    })
    // Tạo mới một sản phẩm
    await categoryServices.addCategory(modelCategory, res);
  };