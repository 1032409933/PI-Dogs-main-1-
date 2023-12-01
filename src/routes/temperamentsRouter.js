const { formToJSON } = require("axios");
const {Router} = require ("express");
const  temperamentsHandler  = require ("../handlers/temperamentsHandler")

const temperamentsRouter = Router();

temperamentsRouter.get ("/",temperamentsHandler)

module.exports = temperamentsRouter;