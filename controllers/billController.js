var billModel = require('../models/billModel');
var billServices = require('../services/billServices')



exports.addBill = async function addBillUser(params) {
    let { id_user } = params;
    if(id_user===undefined ){
      return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
    }else{
      
      // Tạo mới một sản phẩm
    return await billServices.add(params);
    }
  };
exports.getBillByUser = async function getBill(params) {
    let { id_user } = params;
    if(id_user===undefined ){
      return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
    }else{
      // Tạo mới một sản phẩm
    return await billServices.getBillUser(id_user);
    }
  }; 
  exports.getBillById = async function getBillById(id) {
    
    if(id===undefined ){
      return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
    }else{
      // Tạo mới một sản phẩm
    return await billServices.getBillById(id);
    }
  };  