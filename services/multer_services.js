const multer = require("multer");
const path = require("path");

const avatar_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/uploads/avatar/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload_avatar = multer({ storage: avatar_storage });

module.exports = upload_avatar;
