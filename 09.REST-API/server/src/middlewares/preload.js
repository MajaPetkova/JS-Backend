const api = require("../services/furnitureService");

module.exports =()=>async(req, res, next)=>{
    const id= req.params.id;
    const item= await api.getById(id);

    if(item){
       res.locals.item=item; 
       next()
    }else{
        res.status(404).json({message: `item ${id} not found`})
    }
}