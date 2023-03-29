const router = require('express').Router();
const path = require("path");
const UserController = require("../controller/user.controller");
const { authGuard } = require('../middleware/auth')
const multer = require('multer');
const CategoryController = require('../controller/category.controller');

const SUPPORTED_FILE_TYPES = ['.JPG', '.jpeg','.png'];

const images = multer.diskStorage({
    destination: "./images/",
    filename: (request, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: images,
    fileFilter: function (req, file, callback) {
        const fileExt = path.extname(file.originalname);
        if (SUPPORTED_FILE_TYPES.indexOf(fileExt) > -1) {

        } else {
            callback(null, false);
        }
        callback(null, true);
    },
});

//User APIs
router.post('/register',  UserController.signup);
router.post('/login', UserController.login);
router.get("/userById", authGuard, UserController.userById);
// Category APIs
 router.post("/", upload.single('image'), CategoryController.create);
 router.get("/", CategoryController.findAll);
 router.get("/:id", CategoryController.findOne);
 router.put("/:id", CategoryController.update);
 router.delete("/:id", CategoryController.delete);
 router.delete("/", CategoryController.deleteAll);

module.exports = router;