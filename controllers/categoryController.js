var categoryModel = require('../models/categoryModel');
var categoryServices = require('../services/catelogyServices')

exports.getListCategories = async function getListCategories(){
    return await categoryServices.getListCategories()
};

exports.addCategory = async function addNewCategory(params, res) {
    let { nameClass } = params;
    const modelCategory = new categoryModel({
      nameClass: nameClass,
    })
    // Tạo mới một sản phẩm
    await categoryServices.addCategory(modelCategory, res);
  };