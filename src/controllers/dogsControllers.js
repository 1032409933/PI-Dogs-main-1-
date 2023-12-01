const { default: axios } = require("axios");
const { Dog } = require ("../db");

const API = "https://api.thedogapi.com/v1/breeds?"
const APIKEY = "live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx"
const completa = "https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx" 

const cleanArray = (arr) => 
    arr.map ((elem)=>{
        return {
            ID:elem.id,
            Imagen:elem.image.url,
            Nombre:elem.name,
            Altura:elem.height.imperial,
            Peso:elem.weight.imperial,
            Años_de_vida:elem.life_span,
            Temperamentos:elem.temperament,
            Created:false,
        };
    });

    const cleanArrayOne = (arr) => {
        return {
            ID:arr.id,
            Imagen:arr.image.url,
            Nombre:arr.name,
            Altura:arr.height.imperial,
            Peso:arr.weight.imperial,
            Años_de_vida:arr.life_span,
            Created:false,
        };
    }
      




const createDog = async (nombre, altura, peso )=> 
    await Dog.create ({nombre, altura, peso });

const getDogByID = async (idRaza, source) => {
    const dog = source === "api" 
    ? (await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx"))
    .data.find (dogRaza => dogRaza.id==idRaza)
    : await Dog.findByPk (idRaza);

    return cleanArrayOne(dog);
}

const getAllDogs = async () => {

    const apiDogs = (await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx")).data
    
    const  databaseDogs = await Dog.findAll();

    const apiDogsClean = cleanArray(apiDogs)

    const results = [... databaseDogs,...apiDogsClean];

    return results;
}

const getDogsByName = async (name) => {
    

    const dogsNameApi = (await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx"))
    .data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

    const dogsNameBdd = await Dog.findAll({ where: { nombre: name } });

    return [dogsNameApi, ...dogsNameBdd] 
}



module.exports = {createDog, getDogByID, getAllDogs, getDogsByName};