const billdetailModel = require("../models/billdetailModel");
var billModel = require("../models/billModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
var CartModel = require("../models/cartModel");
const notificationModel = require("../models/notificationModel");
const storeModel = require("../models/storeModel");
const ProductModel = require("../models/productModel");
const productModel = require("../models/productModel");
exports.add = async function addBill(params) {
  try {
    const { id_user, products, total, id_store, name, phone } = params;
    const user = await userModel.findById(id_user);
    let saveServices;
    let saveBill;
    if (user) {
      const store = await storeModel.findById(id_store);
      console.log(store.products);
      const stores = store.products;
      var check = true;
      var soldout = "";
      for (var i = 0; i < products.length; i++) {
        var soldout2 = soldout;
        const bb = stores.findIndex(
          (x) => x.id_product._id.toHexString() === products[i].id_product
        );

        if (bb === -1) {
          const product = await ProductModel.findById(products[i].id_product);
          soldout = soldout2 + "" + product.nameProduct + ",";
          check = false;
        } else {
          if (stores[bb].quantity > 0) {
            stores[bb].quantity = stores[bb].quantity - 1;
          } else {
            const product = await ProductModel.findById(products[i].id_product);
            soldout = soldout2 + "" + product.nameProduct + ",";
            check = false;
          }
        }
      }
      console.log(check);
      if (check === true) {
        store.products = stores;
        await store.save();
        const modelBill = new billModel({
          id_user: id_user,
          date_bill: new Date(),
          note_bill: { name: name, phone: phone },
        });
        saveServices = await modelBill.save();
        const { _id } = saveServices;
        const modelBillDetail = new billdetailModel({
          id_bill: _id,
          products: products,
          id_store: id_store,
          total: total,
          status: false,
        });
        await modelBillDetail.save().then(async (data) => {
          const notification = new notificationModel({
            id_user: id_user,
            id_billdetail: data._id,
            content: "Bạn đã đặt hàng thành công",
            date: new Date(),
          });
          await notification.save();
          saveBill = { status: 1, data: data };
        });
      } else {
        saveBill = { status: -1, error: soldout + " hiện đang hết hàng" };
      }
    } else {
      saveBill = { status: -1, error: err };
    }
    return saveBill;
  } catch (error) {
    return { status: -1, error: "Có lỗi gì đó xảy ra" };
  }
};

exports.getBillUser = async function getBillBUser(id_user) {
  console.log(id_user);
  const user = userModel.findById(id_user);
  if (user) {
    const bill = await billdetailModel
      .find()
      .populate({ path: "id_bill", match: { id_user: id_user } })
      .populate({
        path: "products.id_product",
        populate: { path: "id_image" },
      });
    return { status: 1, data: bill };
  } else {
    return { status: -1, error: "Không tìm thấy người dùng" };
  }
};
exports.getBillTotal = async function getBillTotal(total) {
  if (total === "1") {
    const bill = await billdetailModel
      .find({ status: false })
      .populate({ path: "products.id_product", populate: { path: "id_image" } })
      .populate({ path: "id_bill", populate: { path: "id_user" } })
      .populate("id_store");
    return { status: 1, data: bill };
  } else if (total === "2") {
    const bill = await billdetailModel
      .find({ status: true })
      .populate({ path: "products.id_product", populate: { path: "id_image" } })
      .populate({ path: "id_bill", populate: { path: "id_user" } })
      .populate("id_store");
    return { status: 1, data: bill };
  } else {
    return { status: -1, error: "Không tìm thấy dữ liệu" };
  }
};
exports.payment = async function payment(id) {
  try {
    const bill = await billdetailModel.findById(id).populate("id_bill");
    bill.status = true;
    const products = bill.products;
    console.log(products);
    for (var is = 0; is < products.length; is++) {
      console.log(products[is].id_product);
      const product = await productModel.findById(products[is].id_product);
      console.log(product);
      product.quantity_product += products[is].amount;
      await product.save();
    }
    const i = await bill.save();
    const notification = new notificationModel({
      id_user: bill.id_bill.id_user,
      id_billdetail: bill._id,
      content: "Bạn đã thanh toán thành công",
      date: new Date(),
    });
    await notification.save();

    return { status: 1, data: bill };
  } catch (error) {
    return { status: -1, error: error };
  }
};

exports.getBillById = async function getBillById(id) {
  try {
    const bill = await billdetailModel
      .findById(id)
      .populate({ path: "id_bill" })
      .populate({ path: "products.id_product", populate: { path: "id_image" } })
      .populate({ path: "id_store" });
    return { status: 1, data: bill };
  } catch (error) {
    return { status: -1, error: "Loi" };
  }
};
exports.getBill = async function getBill() {
  try {
    const bill = await billdetailModel
      .find()
      .populate({ path: "id_bill" })
      .populate({ path: "products.id_product", populate: { path: "id_image" } })
      .populate({ path: "id_store" });
    return { status: 1, data: bill };
  } catch (error) {
    return { status: -1, error: "Loi" };
  }
};
