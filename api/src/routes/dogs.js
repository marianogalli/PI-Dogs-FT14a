const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const axios = require('axios')
const { Router } = require('express');
const router = Router();

const { Breed, Temperament } = require('../db')
const { getDataFromBreed,capitalize } = require('../helpers/helpers')

router.get('/', async (req, res) => {
    /*
    await Breed.create({name: 'Breton',height: '60 - 70',weight: '30 - 40',years: '10 - 12' })
    await Breed.create({name: 'Setter',height: '60 - 70',weight: '30 - 40',years: '10 - 12' })
    await Breed.create({name: 'Golden',height: '60 - 70',weight: '30 - 40',years: '10 - 12'})
    await Breed.create({name: 'Bull Terrier',height: '40 - 50',weight: '30 - 40',years: '10 - 12'})
    */
    let { name } = req.query;
    if(name){
        name=capitalize(name);
    }
    

    let url;
    let razasDB;

    if (!name) {
        url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
        razasDB = await Breed.findAll({ include: Temperament })
    } else {
        url = `https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&name=${name}`
        razasDB = await Breed.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            include: Temperament
        });
    }

    let resp = await axios.get(url)
    let razasAPI = resp.data.splice(0, 8);
    let allRazas = razasDB.concat(razasAPI);
    let resultadoFinal = [];

    console.log(allRazas)

    if (allRazas.length > 0) {
        allRazas.forEach(raza => {
            resultadoFinal.push(getDataFromBreed(raza))
        })
    }

    if (name && resultadoFinal.length == 0) {
        return res.status(404).json({
            message: `There is not result to breed '${name}'`
        })
    }
    return res.json(resultadoFinal)
})


router.get('/:id', async (req, res) => {

    let idFind = req.params.id;
    let razaFound;

    if (idFind / 1) {
        let url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
        const resp = await axios.get(url);
        razaFound = resp.data.find(raza => raza.id == idFind)
    } else {
        razaFound = await Breed.findByPk(idFind, { include: Temperament })
    }

    if (razaFound) {
        const razaDetail = getDataFromBreed(razaFound)
        return res.json(razaDetail)
    }

    return res.status(404).json({
        message:`No se encontró una raza con id ${idFind}`
    })

})

router.post('/', async (req, res) => {

    let { name, height, weight, years, temperament } = req.body;
    name=capitalize(name);

    const raza=await Breed.findOrCreate({
        where:{name:name},
        defaults:{
            height,
            weight,
            years
        }
    })

    if(raza[1]==false){
        return res.status(403).json({
            error:`${name} already exists in DB!`
        })
    }

    temperament.forEach(async temp => {
        const temperamento = await Temperament.findOrCreate({
            where: { name: temp }
        })
        await raza.addTemperament(temperamento[0])
    })

    return res.json({
        message:`${name} added!`
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