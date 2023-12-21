import pool from '../database/database.js';

//Get all shopping cart
export const getCarritos = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        //if the id_usuario query exist execute this code
        if (id_usuario) {
            const [result] = await pool.query('SELECT * FROM Carrito WHERE id_usuario = ?', [id_usuario]);
            if (!result.length) return res.status(404).json({ "message": "This user dont have products in the shooping cart" });
            res.json(result);
        } else {
            const [result] = await pool.query('SELECT * FROM Carrito');
            if (!result.length) return res.status(404).json({ "message": "This table dont have data" });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new shopping cart
export const createCarrito = async (req, res) => {
    try {
        const { id_usuario, id_producto } = req.body;
        const [result] = await pool.query('INSERT INTO Carrito (id_producto, id_usuario) VALUES (?, ?)', [id_producto, id_usuario]);
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