const { default: axios } = require("axios");
const { Dog } = require ("../db");
const Sequelize = require('sequelize');

const API = "https://api.thedogapi.com/v1/breeds?"
const APIKEY = "live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx"
const completa = "https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx" 

const cleanArray = (arr) => 
    arr.map ((elem)=>{
        return {
            id:elem.id,
            imagen:elem.image.url,
            nombre:elem.name,
            altura:elem.height.imperial,
            peso:elem.weight.imperial,
            añosdevida:elem.life_span,
            Temperamentos:elem.temperament,
            created:false,
        };
    });

    const cleanArrayOne = (arr) => {
        return {
            id:arr.id,
            imagen:arr.image.url,
            nombre:arr.name,
            altura:arr.height.imperial,
            peso:arr.weight.imperial,
            añosdevida:arr.life_span,
            created:false,
        };
    }
      
const createDog = async (imagen, nombre, altura, peso, añosdevida )=> 
    await Dog.create ({imagen, nombre, altura, peso, añosdevida });

    const getDogByID = async (id, source) => {
        let dog;
        if (source === "api") {
          const response = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx");
          const dogApi = response.data.find(dogRaza => dogRaza.id == id);
          dog = cleanArrayOne(dogApi, { imagen: 'image.url' });
        } else {
          dog = await Dog.findByPk(id);
        }
      
        return dog;
      };

const getAllDogs = async () => {

    const apiDogs = (await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx")).data
    
    const  databaseDogs = await Dog.findAll();

    const apiDogsClean = cleanArray(apiDogs)

    const results = [... databaseDogs,...apiDogsClean];

    return results;
}

const getDogsByName = async (nombre) => {
    const dogsNameApi = (
        await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx")
    ).data.filter((dog) => dog.name.toLowerCase().includes(nombre.toLowerCase()));

    const dogsNameBdd = await Dog.findAll({ 
        where: { 
            nombre: { 
                [Sequelize.Op.iLike]: `%${nombre}%` 
            } 
        } 
    });

    // Mapear y limpiar los resultados de ambas fuentes
    const cleanedResults = dogsNameApi.map(cleanArrayOne).concat(dogsNameBdd);

    return cleanedResults;
};


module.exports = {createDog, getDogByID, getAllDogs, getDogsByName};