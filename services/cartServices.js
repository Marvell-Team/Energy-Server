var CartModel = require("../models/cartModel");

exports.edit = async function editCart(cardEdit) {
  let cart = await CartModel.findById(cardEdit.id);
  const { products,total } = cardEdit;
  console.log("tgtgtg", cart);
  if (cart) {
    cart.products = products !== undefined ? products : cart.products;
    cart.total = total !== undefined ? total : cart.total;
  }
  await cart.save();
  return { status: 1, data: cart };
};
exports.getCart = async function getCartByIdUser(id) {
  try {
    let cart = await CartModel.find({ id_user: id }).populate({path:'products.id_product',populate :{path : 'id_image'}});
    let cart2 = await CartModel.find({ id_user: id });
    return { status: 1, data: cart[0],data2:cart2[0] };
  } catch (error) {
    return { status: -1, error: error };
  }
};
