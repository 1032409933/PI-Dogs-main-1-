const {getAllTemperaments} = require ("../controllers/temperamentsControllers")

const temperamentsHandler = async (req,res) =>{
  try {
    const allTemperaments = await getAllTemperaments ()
        res.status(201).json(allTemperaments);
    } catch (error){
        res.status(400).json({error:error.message});
    };
  };

  module.exports = temperamentsHandler;