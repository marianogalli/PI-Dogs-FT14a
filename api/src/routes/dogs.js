const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const axios = require('axios')
const { Router } = require('express');
const router = Router();

const { Breed, Temperament } = require('../db')

const { capMiddleware } = require('../middlewars/StringMiddleware')

router.get('/getPerro',async(req,res)=>{
    const perroConTemperamentos=await Breed.findOne({
        where:{name:'Coker'}, 
        include:Temperament
    })


    res.json(
        perroConTemperamentos
    )
})

router.get('/', capMiddleware, async (req, res) => {

    /*
    await Breed.create({name: 'Breton',height: '60 - 70',weight: '30 - 40',years: '10 - 12' })
    await Breed.create({name: 'Setter',height: '60 - 70',weight: '30 - 40',years: '10 - 12' })
    await Breed.create({name: 'Golden',height: '60 - 70',weight: '30 - 40',years: '10 - 12'})
    await Breed.create({name: 'Bull Terrier',height: '40 - 50',weight: '30 - 40',years: '10 - 12'})
    */

    const { name } = req.query;
    let url;
    let razasDB;

    if (!name) {
        url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
        razasDB = await Breed.findAll();
    } else {
        url = `https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&name=${name}`
        //Debo incluir el/los temperamentos de la raza!!
        razasDB = await Breed.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
    }

    let resp = await axios.get(url)
    let razasAPI = resp.data.splice(0, 8);

    let allRazas = razasDB.concat(razasAPI);

    let resultadoFinal = [];

    allRazas.forEach(raza => {
        const height = raza.height.metric || raza.height;
        const weight = raza.weight.metric || raza.weight;
        const years = raza.life_span || raza.years;
        const { id, name } = raza
        const temperament = raza.temperament || 'aun no especificado'
        const img = raza.image ? raza.image.url : 'No especificado'
        resultadoFinal.push({ id, name, height, weight, years, temperament, img })
    })

    if (resultadoFinal.length == 0) {
        return res.status(404).json({
            message: `No se encontraron resultados para la búsqueda '${name}'`
        })
    }

    return res.json(resultadoFinal)
})


router.get('/:id', async (req, res) => {
    const  idFind  = req.params.id;
    let razaFound;

    if (idFind / 1) {
        let url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
        const resp =await axios.get(url);
        let raza=resp.data.find(raza => raza.id == idFind)
        const height = raza.height.metric
        const weight = raza.weight.metric
        const years = raza.life_span
        const { id, name } = raza
        const temperament = raza.temperament
        const img =raza.image.url;
        razaFound={id,name,height,weight,years,temperament,img}
    }else{
        razaFound=await Breed.findByPk(idFind)
    }
    return res.json(razaFound)

})

router.post('/',async (req,res)=>{
    const {name,height,weight,years,temperament}=req.body;

    const raza=await Breed.create({name,height,weight,years})

    temperament.forEach(async temp=>{
        const temperamento=await Temperament.findOrCreate({
            where:{name:temp}
        })
        await raza.addTemperament(temperamento[0])
        
    })

    const perroConTemperamentos=await Breed.findOne({
        where:{name:'Dogo Argentino'}, 
        include:Temperament
    })


    res.json({
        ok:true
    })
    
})



//Forma vieja
/*
router.get('/', async (req, res) => {   
  
    const limit = req.query.limit || 8;
    const page = req.query.page || 1;
    let salto = ((page - 1) * limit);
    let arregloPaginacion = [];
    
    const razasDB=await Breed.findAll();     

    let url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    let resp = await axios.get(url)    
    
    for(let i=0; i<razasDB.length; i++){
        let raza=razasDB[i];
        resp.data.unshift(raza)
    }        
    
    for (let i = 0; i < limit; i++) {
        if (resp.data[salto + i]) {            
            const raza = resp.data[salto + i];
            const height=raza.height.metric || raza.height;
            const weight = raza.weight.metric || raza.weight;
            const years=raza.life_span || raza.years;
            const {id,name} = raza
            const temperament=raza.temperament || 'aun no especificado'
            let image;
            if(raza.image){
                image=raza.image.url;
            }else{
                image='No especificado aun'
            }
            arregloPaginacion.push({ id, name, temperament, weight, height,years,image })
        }else{
            return res.json(arregloPaginacion) 
        }
    }
    return res.json(arregloPaginacion)
})
*/


module.exports = router;