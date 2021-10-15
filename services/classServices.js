var categoryServices = require("./catelogyServices");
var ClassModel = require("../models/classModel");
var convertDate = require("../utilities/convertDate");
const classModel = require("../models/classModel");


exports.getListClass = async function getListClass() {
  let classs = await ClassModel.find().populate("idType");
  // console.log('>>>>>>>>>>>', classs)

  // let list = classs.map((sp) => {
  //   return {
  //     id: sp._id,
  //     fullName: sp.fullName,
  //     phoneNumber: sp.phoneNumber,
  //     avatar: sp.avatar,
  //     startDate: convertDate.execute(sp.startDate),
  //     classRoom: sp.idType,
  //   };
  // });
  return classs;
};

exports.getClassById = async function getClassById(id) {
  let classs = await ClassModel.findById(id);
  // classs = { ...classs, id: classs._id };
  return classs;
};

exports.addNew = async function addNewClass(classes, res) {
  let saveServices = await classes.save();
  if(saveServices){
    res.redirect("/class");
  }
};

exports.edit = async function editClass(classes) {
  let classEdit = await classModel.findById(classes.id)
  console.log('tgtgtg',classEdit);
  if(classEdit){
    classEdit.fullName = classes.fullName;
    classEdit.phoneNumber = classes.phoneNumber;
    if (classes.avatar) {
      classEdit.avatar = classes.avatar;
    }
    classEdit.startDate = classes.startDate;
    classEdit.idType = classes.idType;

  }
  await classEdit.save()
};

exports.remove = async function removeClassById(id) {
  let classRemove = await classModel.findByIdAndRemove(id)
  return await classRemove;
};
