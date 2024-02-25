import pool from '../database/database.js';

//Get all shopping cart
export const getCarritos = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        //if the id_usuario query exist execute this code
        if (id_usuario) {
            const [result] = await pool.query('SELECT * FROM Carrito WHERE id_usuario = ?', [id_usuario]);
            /* if (!result.length) return res.status(404).json({ "message": "This user dont have products in the shooping cart" }); */
            res.json(result);
        } else {
            const [result] = await pool.query('SELECT * FROM Carrito');
            /*  if (!result.length) return res.status(404).json({ "message": "This table dont have data" }); */
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a cart shop
export const getCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT * FROM Carrito WHERE id = ?`, [id]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get data mini-dashboard
export const getDataMiniDashboard = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        if (id_usuario) {
            const [result] = await pool.query(`
            select  SUM(( p.precio - (p.precio * (p.descuento/ 100))) * c.unidades) 
            as subTotal, COUNT(*) as seleccionados
            from carrito as c join productos as p on c.id_producto = p.id 
            where id_usuario = ? AND seleccionado = 1 AND p.unidades > 0;
            `, [id_usuario]);
            res.json(result[0]);
        } else return res.status(404).json({ "message": `The query params is not exists` });
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

//Create a new shopping cart
export const createCarrito = async (req, res) => {
    try {
        const { id_usuario, id_producto, unidades, color, size, seleccionado } = req.body;
        const [result] = await pool.query('INSERT INTO Carrito (id_producto, id_usuario, unidades, color, size, seleccionado) VALUES (?, ?, ?, ?, ?, ?)', [id_producto, id_usuario, unidades, color, size, seleccionado]);
        if (!result.affectedRows) return res.status.json({ "message": "Error in the query (create a new shopping cart)" });
        res.json({
            id: result.insertId,
            id_producto,
            id_usuario
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//update the data of a shopping cart
export const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('UPDATE Carrito SET ? WHERE id = ?', [req.body, id]);
        if (!result.affectedRows) return res.status.json({ "message": `Error in the query (update a shopping cart with id = ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

export const getCarritosSeleccionado = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        if (id_usuario) {
            const [result] = await pool.query(`SELECT c.Id_Producto as Id_Producto, c.Unidades as Unidades, c.Size as Size, c.Color as Color, p.Nombre as Nombre, p.Precio as Precio, p.Descuento as Descuento, p.Imagen as Imagen
            FROM carrito AS c
            JOIN productos AS p ON c.id_producto = p.id
            WHERE c.seleccionado = true
            AND p.unidades > 0 AND c.id_usuario = ?`, [id_usuario]);
            res.json(result);
        } else return res.status(400).json({ "message": `The query params is not exist!` });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

//delete a shopping cart
export const deleteCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM Carrito WHERE id = ?", [id]);
        if (!result.affectedRows) return res.status.json({ "message": `Error in the query (delete a shopping cart with id = ${id})` });
        res.json({ "message": `Shopping cart with id ${id} was deleted` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}