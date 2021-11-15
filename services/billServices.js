const billdetailModel = require("../models/billdetailModel");
var billModel = require("../models/billModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
var CartModel = require("../models/cartModel");
exports.add = async function addBill(params) {
    const {id_user,id_cart,id_store,name,note,phone} = params;
    const user= await userModel.findById(id_user);
    const cart = await cartModel.findById(id_cart);

    let saveServices;
    let saveBill;
    if(user){
        const modelBill = new billModel({
            id_user: id_user,
            date_bill: Date.now(),
            note_bill:{name:name,phone:phone}
          })
         saveServices = await modelBill.save();
         const {_id}=saveServices;
         const modelBillDetail = new billdetailModel({
            id_bill:_id,
            products:cart.products,
            id_store:id_store,
            total:cart.total,
            status:'Chưa Thanh Toán'
         })
          await modelBillDetail.save().then(data => {
            saveBill={status:1,data:data};
            
         })
    }else{
        saveBill={status:-1,error:err};
    }
    if(saveBill.status===1){
        let cart = await CartModel.findById(id_cart);
          if (cart) {
      cart.products =[];
      cart.total = 0;
    }
    await cart.save();
    return saveBill;
    }
       
};

exports.getBillUser = async function getBillBUser(id_user) {
    console.log(id_user)
    const user=userModel.findById(id_user);
   if(user){
     const bill= await billdetailModel.find().populate({path:'id_bill',match:{id_user:id_user}}).populate({path:'products.id_product',populate :{path : 'id_image'}});
     return {status:1,data:bill}
   }else{
       return {status:-1,error:'Không tìm thấy người dùng'}
   }
};
exports.getBillById = async function getBillById(id) {
 
   try {
    const bill= await billdetailModel.findById(id).populate({path:'id_bill'}).populate({path:'products.id_product',populate :{path : 'id_image'}});
    return {status:1,data:bill}
   } catch (error) {
    return {status:-1,error:'Loi'}
   }
 
};