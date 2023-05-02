const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

//Storage, FileFilter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    //File --- Mimetype = image/jpg

    const extention = file.mimetype.split("/")[1]; // to take jpg/png whatever
    req.savedProfileImage = "image_" + req.user.id + "." + extention;
    cb(null, req.savedProfileImage);
  },
});

const fileFilter = (req,file,cb) =>{
    let allowedMimeTypes = ["image/jpg","image/gif", "image/jpeg", "image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file"),400,false)
    }
    return cb(null,true)
}


const profileImageUpload = multer({storage: storage,fileFilter})

module.exports = profileImageUpload;
