var ProductModel = require("../models/productModel");

var ImageModel = require("../models/imageModel");
const likeModel = require("../models/likeModel");
const productModel = require("../models/productModel");
const storeModel = require("../models/storeModel");

exports.getListProductByIdCategorys =
  async function getListProductByIdCategorys(id, body) {
    try {
      const { price, sell } = body;
      if (sell !== null) {
        let productt = await ProductModel.find({ id_category: id })
          .populate("id_image")
          .populate("id_category")
          .sort({ quantity_product: -1 });
        if (productt) {
          return { status: 1, data: productt };
        } else {
          return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
        }
      } else if (price !== null) {
        let productt = await ProductModel.find({ id_category: id })
          .populate("id_image")
          .sort({ price_product: price });
        if (productt) {
          return { status: 1, data: productt };
        } else {
          return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
        }
      } else {
        let productt = await ProductModel.find({ id_category: id }).populate(
          "id_image"
        );

        if (productt) {
          return { status: 1, data: productt };
        } else {
          return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
        }
      }
    } catch (error) {
      return { status: -1, error: error };
    }
  };
exports.getListProductLSR = async function getListProductLSR(body) {
  try {
    const { price, sell } = body;
    if (sell !== null) {
      let productt = await ProductModel.find()
        .populate("id_image")
        .sort({ quantity_product: -1 });
      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    } else if (price !== null) {
      let productt = await ProductModel.find()
        .populate("id_image")
        .sort({ price_product: price });
      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    } else {
      let productt = await ProductModel.find().populate("id_image");

      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    }
  } catch (error) {
    return { status: -1, error: error };
  }
};
exports.getListProduct = async function getListProduct(body) {
  try {
    // const {price,sell}=body;
    // if(sell!==null){
    //   console.log(sell)
    //  }else if(price!==null){
    //    let productt = await ProductModel.find().populate('id_image').sort({'price_product':price});
    //    if(productt){
    //    return {status:1,data:productt}
    //  }else{
    //   return {status:-1,error:'Đã xảy ra lỗi kết nỗi'}
    //  }
    // }else{
    let productt = await ProductModel.find().populate("id_image");

    if (productt) {
      return { status: 1, data: productt };
    } else {
      return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
    }
  } catch (error) {
    return { status: -1, error: error };
  }
};
exports.getListLikeProduct = async function getListLikeProduct() {
  try {
    let mysort = { avg_vote: -1 };
    let productt = await ProductModel.find().sort(mysort).populate("id_image");
    if (productt) {
      return { status: 1, data: productt };
    } else {
      return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
    }
  } catch (error) {
    return { status: -1, error: error };
  }
};
exports.getListProductByCategory = async function getListProductByCategory(
  categorys,
  body
) {
  try {
    const { price, sell } = body;
    if (sell !== null) {
      let productt = await ProductModel.find()
        .populate({
          path: "id_category",
          match: {
            categorys: categorys,
          },
        })
        .populate("id_image");

      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    } else if (price !== null) {
      let productt = await ProductModel.find()
        .populate({
          path: "id_category",
          match: {
            categorys: categorys,
          },
        })
        .populate("id_image")
        .sort({ price_product: -1 });

      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    } else {
      let productt = await ProductModel.find()
        .populate({
          path: "id_category",
          match: {
            categorys: categorys,
          },
        })
        .populate("id_image");
      if (productt) {
        return { status: 1, data: productt };
      } else {
        return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
      }
    }
  } catch (error) {
    return { status: -1, error: error };
  }
};

exports.getProductById = async function getProductById(id) {
  try {
    let productt = await ProductModel.findById(id)
      .populate("id_image")
      .populate("id_category")
      .exec();
    if (productt) {
      return { status: 1, data: productt };
    } else {
      return { status: -1, error: "Đã xảy ra lỗi kết nỗi" };
    }
  } catch (error) {
    return { status: -1, error: error };
  }
};

exports.addNew = async function addNewProduct(products) {
  let {
    id_category,
    id_image,
    nameProduct,
    price_product,
    quantity_product,
    description_product,
    chip_product,
    rom_product,
    ram_product,
    camera_late_product,
    pin_product,
  } = products;
  if (
    id_category === undefined ||
    id_image === undefined ||
    nameProduct === undefined ||
    price_product === undefined ||
    quantity_product === undefined
  ) {
    return { status: -1, error: "Không tìm thấy dữ liệu truyền vào" };
  } else {
    const modelProduct = new productModel({
      nameProduct: nameProduct,
      price_product: price_product,
      description_product: {
        description_product: description_product,
        chip: chip_product,
        ram: ram_product,
        rom: rom_product,
        camera_late: camera_late_product,
        pin: pin_product,
      },
      quantity_product: 0,
      id_image: id_image,
      id_category: id_category,
      stock: true,
      avg_vote: 0,
    });
    let saveServices = await modelProduct.save();
    if (saveServices) {
      return { status: 1, data: saveServices };
    }
  }
};

exports.addImage = async function addNewImage(image, res) {
  let saveServices = await image.save();
  if (saveServices) {
    return saveServices;
  }
};

exports.edit = async function editProduct(products) {
  const {
    id,
    nameProduct,
    price_product,
    id_category,
    quantity_product,
    description_product,
    stock,
    nameImage,
    chip_product,
    ram_product,
    rom_product,
    camera_late_product,
    pin_product,
  } = products;
  let productEdit = await ProductModel.findById(products.id).populate(
    "id_image"
  );

  if (productEdit) {
    if (
      nameImage !== undefined &&
      Array.isArray(nameImage) &&
      nameImage.length
    ) {
      const image = await ImageModel.findById(productEdit.id_image);
      image.nameImage = nameImage;
      await image.save();
    }
    productEdit.nameProduct =
      nameProduct !== undefined ? nameProduct : productEdit.nameProduct;
    productEdit.price_product =
      price_product !== undefined ? price_product : productEdit.price_product;
    productEdit.id_category =
      id_category !== undefined ? id_category : productEdit.id_category;
    productEdit.description_product =
      description_product !== undefined
        ? {
            description_product: description_product,
            chip: chip_product,
            ram: ram_product,
            rom: rom_product,
            camera_late: camera_late_product,
            pin: pin_product,
          }
        : productEdit.description_product;
    productEdit.stock = stock !== undefined ? stock : productEdit.stock;
    productEdit.quantity_product =
      quantity_product !== undefined
        ? quantity_product
        : productEdit.quantity_product;

    await productEdit.save();
    console.log(productEdit);
    return { status: 1, data: productEdit };
  } else {
    return { status: -1, error: "Không tìm thấy dữ liệu" };
  }
};

exports.remove = async function removeProductById(id) {
  try {
    let productRemove = await ProductModel.findByIdAndRemove(id);
    return { status: 1, data: productRemove };
  } catch (error) {
    return { status: -1, error: error };
  }
};
exports.getProductByStore = async function getProductByStore(id) {
  try {
    let productRemove = await storeModel.findById(id).populate({
      path: "products.id_product",
      populate: { path: "id_image" },
    });
    return { status: 1, data: productRemove };
  } catch (error) {
    return { status: -1, error: error };
  }
};
