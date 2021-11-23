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
  exports.getBillByTotal = async function getBillByTotal(total) {
   
    if(total===undefined ){
      return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
    }else{
      // Tạo mới một sản phẩm
    return await billServices.getBillTotal(total);
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
  exports.payment = async function payment(id) {
    
    if(id===undefined ){
      return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
    }else{
      // Tạo mới một sản phẩm
    return await billServices.payment(id);
    }
  };  
  exports.getBill = async function getBill() {
    
   
      // Tạo mới một sản phẩm
    return await billServices.getBill();
    
  };  