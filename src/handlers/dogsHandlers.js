const { createDog, getDogByID, getAllDogs, getDogsByName } = require ("../controllers/dogsControllers")
const axios = require ("axios");


const getDogsHandler = async (req,res)=>{
    try {
        const dogs = await getAllDogs();
        res.status(200).json(dogs)
        }catch (error){
        res.status(400).json({error:error.message});
    }
};

const getDogsByNameHandler = async (req,res)=>{
    const { nombre } = req.query;
    try {
        const dogName = await getDogsByName (nombre);
        res.status(200).json(dogName)
        }catch (error){
        res.status(400).json({error:error.message});
    }
};

const getDogsByIdHandler = async (req,res) =>{
    const { id } = req.params;
    
    const source = isNaN(id) ? "bdd" : "api";

    try {
    const dog = await getDogByID(id, source);
    res.status(200).json(dog)
    }catch (error){
    res.status(400).json({error:error.message});
}
};

const postDogHandler = async(req,res)=>{
    const { imagen, nombre, altura, peso, añosdevida } = req.body;
    try {
    const newDog = await createDog ( imagen, nombre, altura, peso, añosdevida )
        res.status(201).json(newDog);
    } catch (error){
        res.status(400).json({error:error.message});
    } 
};

module.exports = {
    getDogsHandler,
    getDogsByNameHandler,
    getDogsByIdHandler,
    postDogHandler
}