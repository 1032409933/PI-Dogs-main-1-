// const { createDog, getDogByID, getAllDogs, getDogsByName } = require ("../controllers/dogsControllers")
// const axios = require ("axios");


// const getDogsHandler = async (req,res)=>{
//     try {
//         const dogs = await getAllDogs();
//         res.status(200).json(dogs)
//         }catch (error){
//         res.status(400).json({error:error.message});
//     }
// };

// const getDogsByNameHandler = async (req,res)=>{
//     const { name } = req.query;
//     try {
//         const dogName = await getDogsByName (name);
//         res.status(200).json(dogName)
//         }catch (error){
//         res.status(400).json({error:error.message});
//     }
// };

// const getDogsByIdHandler = async (req,res) =>{
//     const { idRaza } = req.params;
    
//     const source = isNaN(idRaza) ? "bdd" : "api";

//     try {
//     const dog = await getDogByID(idRaza, source);
//     res.status(200).json(dog)
//     }catch (error){
//     res.status(400).json({error:error.message});
// }
// };

// const postDogHandler = async(req,res)=>{
//     const { imagen, nombre, altura, peso, años_de_vida } = req.body;
//     try {
//     const newDog = await createDog ( imagen, nombre, altura, peso, años_de_vida )
//         res.status(201).json(newDog);
//     } catch (error){
//         res.status(400).json({error:error.message});
//     } 
// };

const getDogsHandler = (req,res)=>{
    res.status(200).send("estos son todos los perros")
}

const getDogsByNameHandler =(req,res) =>{
    const nombre = req.query.nombre;
    res.status(200).send(`este es el dogs con nombre : ${nombre} `)
}

const getDogsByIdHandler =(req,res) =>{
    const {id} = req.params
    res.status(200).send(`este es el dogs con id : ${id} `)
}

const postDogHandler =(req,res)=>{
    const { imagen, nombre, altura, peso, añosdevida } = req.body;
    res.status(200).send(`ser crea el usuario:
    imagen:${imagen},
    nombre:${nombre},
    altura:${altura},
    peso:${peso},
    añosdevida:${añosdevida},
    `)
}

module.exports = {
    getDogsHandler,
    getDogsByNameHandler,
    getDogsByIdHandler,
    postDogHandler
}