var UserModel = require("../models/userModel");

const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const cartModel = require("../models/cartModel");

exports.login = async function login(users) {
  const { email_user, pwd_user } = users;
  let user = await UserModel.find({
    email_user: email_user,
    pwd_user: pwd_user,
  })
    .exec()
    .then((data) => {
      if (data[0].active === true) {
        if (!(Array.isArray(data) && !data.length)) {
          const {
            _id,
            email_user,
            name_user,
            phone_user,
            address_user,
            avt_user,
            born_day,
            gender_user,
            active,
          } = data[0];
          const accesToken = jwt.sign({ id: _id }, process.env.JWT_KEY);
          if (active === true) {
            return {
              status: 1,
              data: {
                accesToken: accesToken,
                id: _id,
                email_user: email_user,
                name_user: name_user,
                phone_user: phone_user,
                address_user: address_user,
                avt_user: avt_user,
                born_day: born_day,
                gender_user: gender_user,
              },
            };
          } else {
            return { status: -1, error: "Tài khoản bạn đã bị khóa" };
          }
        } else {
          return { status: -1, error: "Khong tim thay du lieu" };
        }
      } else {
        return { status: -1, error: "Tài khoản đã bị khóa" };
      }
    })
    .catch((err) => {
      return { status: -1, error: err };
    });
  return user;
};

exports.getListUser = async function getListUser() {
  try {
    let userr = await UserModel.find();
    return { status: 1, data: userr };
  } catch (error) {
    return { status: -1, error: "Có lỗi xảy ra" };
  }
};

exports.blockUserById = async function blockUserById(id) {
  try {
    let user = await userModel.findById(id);
    if (user) {
      user.active = !user.active;
    }
    await user.save();
    return { status: 1, data: user };
  } catch (error) {
    return { status: -1, error: error };
  }
};

exports.getUserById = async function getUserById(id) {
  let userr = await UserModel.findById(id)
    .then((data) => {
      return {
        status: 1,
        data: {
          email_user: data.email_user,
          name_user: data.name_user,
          phone_user: data.phone_user,
          address_user: data.address_user,
          avt_user: data.avt_user,
          gender_user: data.gender_user,
          born_day: data.born_day,
          active: data.active,
        },
      };
    })
    .catch((err) => {
      return { status: -1, error: err };
    });
  return userr;
};

exports.addNew = async function addNewUser(users, res) {
  let user = await UserModel.find({ email_user: users.email_user });
  if (Array.isArray(user) && user.length) {
    return { status: -1, error: "Tài khoản đã được sử dụng" };
  } else {
    let saveServices = await users
      .save()
      .then((data) => {
        return {
          status: 1,
          data: {
            id: data._id,
            email_user: data.email_user,
            name_user: data.name_user,
            phone_user: data.phone_user,
            address_user: data.address_user,
            avt_user: data.avt_user,
            gender_user: data.gender_user,
            born_day: data.born_day,
          },
        };
      })
      .catch((err) => {
        return { status: -1, error: "Đã xảy ra lỗi gì đó" };
      });
    return saveServices;
  }
};
exports.edit = async function editUser(usersEdit) {
  try {
    let user = await userModel.findById(usersEdit.id);
    const {
      id,
      email_user,
      name_user,
      phone_user,
      address_user,
      avt_user,
      gender_user,
      born_day,
    } = usersEdit;
    console.log("tgtgtg", avt_user);
    if (user) {
      // const users = await UserModel.updateOne(
      //   {_id:id},
      //   {$set :
      //     {
      //     email_user : email_user!==undefined?(email_user):(user.email_user),
      //     name_user : name_user!==undefined?(name_user):(user.name_user),
      //     phone_user : phone_user!==undefined?(phone_user):(user.phone_user),
      //     address_user : address_user!==undefined?(address_user):(user.address_user),
      //     avt_user : avt_user!==undefined?(avt_user):(user.avt_user),
      //   }},
      // )
      user.email_user = email_user !== undefined ? email_user : user.email_user;
      user.name_user = name_user !== undefined ? name_user : user.name_user;
      user.phone_user = phone_user !== undefined ? phone_user : user.phone_user;
      user.address_user =
        address_user !== undefined ? address_user : user.address_user;
      user.avt_user = avt_user !== undefined ? avt_user : user.avt_user;
      user.gender_user =
        gender_user !== undefined ? gender_user : user.gender_user;
      user.born_day = born_day !== undefined ? born_day : user.born_day;
    }
    await user.save();
    return {
      status: 1,
      data: {
        email_user: user.email_user,
        name_user: user.name_user,
        phone_user: user.phone_user,
        address_user: user.address_user,
        avt_user: user.avt_user,
        born_day: user.born_day,
        gender_user: user.gender_user,
      },
    };
  } catch (error) {
    return { status: -1, error: error };
  }
};

// exports.remove = async function removeUserById(id) {
//   let userRemove = await userModel.findByIdAndRemove(id)
//   return await userRemove;
// };
