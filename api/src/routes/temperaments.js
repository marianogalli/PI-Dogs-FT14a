const {Router}=require('express');
const router=Router();
const axios=require('axios')
const {Temperament } = require('../db')

router.get('/',async(req,res)=>{
    let url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    let resp=await axios.get(url);
    let razasAPI=resp.data;

    let temperamentos=[]

    razasAPI.forEach(raza=>{
        let temp=raza.temperament;
        if(temp && typeof temp!==undefined){
            let temps=temp.split(',');
            temps.forEach(t=>temperamentos.push(t.trim()))//le quito espacio inicial y final
        }        
    })
    
    temperamentos.forEach(async t=>{
        await Temperament.findOrCreate({where:{name:t}})
    })

    let temperamentsDB=await Temperament.findAll({
        attributes:['name'],
        order:['name']
    });
    
    res.json(temperamentsDB)       
    
})


module.exports=router;