import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
//Imports routes
import routerCategoria from './routes/categorias.routes.js';
import routerProductos from './routes/productos.routes.js';
import routerUsuarios from './routes/usuarios.routes.js';
import routerSizes from './routes/sizes.routes.js';
import routerColores from './routes/colores.routes.js';
import routerCarrito from './routes/carrito.routes.js';
import routerPedidos from './routes/pedidos.routes.js';
import routerDetalle from './routes/detalle.routes.js';
import routerDashboard from './routes/dashboard.routes.js';
//Proyect middlwares
import {generateAdminUser} from './middlewares/userAdmin.js';

//Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

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
app.use(routerCarrito);
app.use(routerPedidos);
app.use(routerDetalle);
app.use(routerDashboard);

//Statics files
app.use(express.static(join(__dirname,'./public')));

//Run Server
app.listen(app.get('PORT'), ()=>{
    generateAdminUser();
    console.log(`The server running on port ${app.get('PORT')}`);
});
