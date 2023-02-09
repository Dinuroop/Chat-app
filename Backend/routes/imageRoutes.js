const { addImage, getImage} = require("../controllers/imageController");

const router = require("express").Router();


router.post("/addimg/",addImage);
router.post("/getimg/",getImage);


module.exports = router;