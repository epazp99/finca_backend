import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { UserController } from "../controller/user.controller";


const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 9707;

AppDataSource.initialize().then(async () => {

    app.use(cors());

    // Configuring body parser middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Configuracion para subir imagenes
    app.use(fileUpload());

    // Importamos las rutas
    // var routes = require('./url/url');
    // const inicio = require('./controllers/apis');
    const user_controller = new UserController(); 


    app.use('/apis', user_controller.router);

    module.exports = app;

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.name = "Testtt" 
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    app.listen(port, () => console.log(`El servidor esta escuchando en el puerto ${port}!`));


}).catch(error => console.log(error))
