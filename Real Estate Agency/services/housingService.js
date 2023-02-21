const Housing= require("../models/Housing");


async function getHousingById(id){
 const housing = await Housing.findById(id);
 return housing;
}

async function createHousing(housing){
 const result= await Housing.create();
//  const result=new Housing(housing);
// await housing.save()
}


module.exports= {
    getHousingById,
    createHousing,
}