var cartModel = require('../models/cartModel');
var cartServices = require('../services/cartServices')



exports.EditCart = async function EditCart( id,params) {
  
    const { products,total } = params;
    let product = {
      total:total,
      products:products,
      id:id
    };
    return await cartServices.edit(product);
      
  };

  exports.getCart = async function getCart(id) {
    return await cartServices.getCart(id);
  };