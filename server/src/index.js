import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { dirname, extname, join } from 'path'
import { fileURLToPath } from 'url';
import multer from 'multer';
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
import routerComentarios from './routes/comentarios.routes.js';
import routerRankings from './routes/ranking.routes.js';
import routerCheckout from './routes/checkout.routes.js'

//Proyect middlwares
import { generateAdminUser } from './middlewares/userAdmin.js';

//Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
    destination: join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueId + extname(file.originalname).toLocaleLowerCase());
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|png|jpeg|gif|JPG|PNG/;
        const mimetypes = fileTypes.test(file.mimetype);
        const extnameFile = fileTypes.test(extname(file.originalname));
        if (mimetypes && extnameFile) return cb(null, true);
        cb('Error: el archivo debe ser una imagen valida');
    }
});

//Settings
app.set('PORT', 3000);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes API
app.use(routerCategoria);
app.use(routerProductos);
app.use(routerUsuarios);
app.use(routerSizes);
app.use(routerColores);
app.use(routerCarrito);
app.use(routerPedidos);
app.use(routerDetalle);
app.use(routerDashboard);
app.use(routerComentarios);
app.use(routerRankings);
app.use(routerCheckout);

//Route for upload files
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ "message": 'Please, select a file' });
    res.json({ "urlImage": `http://localhost:3000/uploads/${req.file.filename}` });
});

//Statics files
app.use(express.static(join(__dirname, './public')));

//Run Server
app.listen(app.get('PORT'), () => {
    generateAdminUser();
    console.log(`The server running on port ${app.get('PORT')}`);
});
