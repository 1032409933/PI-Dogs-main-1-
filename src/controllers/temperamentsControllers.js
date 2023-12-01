const { default: axios } = require("axios");


const getAllTemperaments = async () => {

    const apiTemperaments = (
        await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_lX1K3Z3KikQmWD6thfx9nTXY9dbS82WOWTxxChqDerwFygq23JCkNsKtR1mE9cAx")
        ).data;

        let allTemperaments = [];

        apiTemperaments.forEach(dog => {
            if (dog.temperament !== undefined && dog.temperament !== null) { 
                allTemperaments = allTemperaments.concat(dog.temperament.split(',').map(temperament => temperament.trim()));
            }
        });

        allTemperaments = Array.from(new Set(allTemperaments));

        return  [...allTemperaments ];
}

module.exports = { getAllTemperaments }