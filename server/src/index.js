import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routerCategoria from './routes/categorias.routes.js';
import routerProductos from './routes/productos.routes.js';
import routerUsuarios from './routes/usuarios.routes.js';
import routerSizes from './routes/sizes.routes.js';
import routerColores from './routes/colores.routes.js';
import {generateAdminUser} from './middlewares/userAdmin.js';

//Initializations
const app = express();

//Settings
app.set('PORT', 3000);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use(routerCategoria);
app.use(routerProductos);
app.use(routerUsuarios);
app.use(routerSizes);
app.use(routerColores);

//Run Server
app.listen(app.get('PORT'), ()=>{
    generateAdminUser();
    console.log(`The server running on port ${app.get('PORT')}`);
});
