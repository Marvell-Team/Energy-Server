
var ProductModel = require("../models/productModel");

const productModel = require("../models/productModel");


exports.getListProduct = async function getListProduct() {
  let productt = await ProductModel.find().populate("idType");
  // console.log('>>>>>>>>>>>', productt)

  // let list = productt.map((sp) => {
  //   return {
  //     id: sp._id,
  //     fullName: sp.fullName,
  //     phoneNumber: sp.phoneNumber,
  //     avatar: sp.avatar,
  //     startDate: convertDate.execute(sp.startDate),
  //     productRoom: sp.idType,
  //   };
  // });
  return productt;
};

exports.getProductById = async function getProductById(id) {
  let productt = await ProductModel.findById(id);
  // productt = { ...productt, id: productt._id };
  return productt;
};

exports.addNew = async function addNewProduct(products, res) {
  let saveServices = await products.save();
  if(saveServices){
    res.redirect("/product");
  }
};

exports.edit = async function editProduct(products) {
  let productEdit = await productModel.findById(products.id)
  console.log('tgtgtg',productEdit);
  if(productEdit){
    productEdit.nameProduct = products.nameProduct;
    productEdit.price = products.price;
    if (products.imgProduct) {
      productEdit.imgProduct = products.imgProduct;
    }
    productEdit.material = products.material;
    productEdit.idType = products.idType;

  }
  await productEdit.save()
};

exports.remove = async function removeProductById(id) {
  let productRemove = await productModel.findByIdAndRemove(id)
  return await productRemove;
};
