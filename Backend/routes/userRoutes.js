const { register,login,setAvatar,getAllUsers,logOut } = require("../controllers/usersController");
//const Formidable = require("formidable");
const router = require("express").Router();


router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
// router.post("/file-upload",(res,res)=>{
//     const form = new Formidable.IncomingForm();
//     form.parse(req, (error, fields, files)=>{
//         const {media_file} = files,
// })
router.get("/allusers/:id",getAllUsers);
router.get("/logout/:id",logOut);

module.exports = router;