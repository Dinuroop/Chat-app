const Image = require("../model/imageModel");

module.exports.addImage = async(req,res,next)=>{

    try{
        const{from,to,pic} = req.body;
        req.body.image = req.file.path
        const data = await Image.create({ 
            image:pic,
            users:[from,to],
            sender:from,
            
        })
        if(data) return res.json({msg:"Message added successfully."});
        return res.json({msg:"Failed to add message to database"});
    }catch(ex){
        next(ex);
    }
}

module.exports.getImage = async(req,res,next)=>{
    try{
        const {from,to} = req.body;
        const images = await Image.find({
            users:{
                $all:[from,to],
            },
        })
        .sort({updatedAt:1});
        const projectMessges = images.map((img)=>{
            return{
                fromSelf:img.sender.toString()===from,
                message:img.image,
            }
        });
        res.json(projectMessges);
    }catch(ex){
        next(ex);
    }
}