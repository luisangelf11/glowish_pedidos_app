import pool from '../database/database.js';

//Get all sizes
export const getSizes = async (req, res) => {
    try {
        const { id_producto, limit, offset } = req.query;
        //if the query have an id_product use a filter for this id_product
        if ((!limit && !offset) && id_producto) {
            const [result] = await pool.query('SELECT * FROM Sizes WHERE Id_Producto = ?', [id_producto]);
            if (!result.length) return res.status(404).json({ "message": "The table don't have data" });
            res.json(result);
        } else if(limit && offset) {
            const [result] = await pool.query(`SELECT * FROM Sizes ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            if (!result.length) return res.status(404).json({ "message": "The table don't have data" });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a size for her id
export const getSize = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM Sizes WHERE id = ?', [id]);
        if (!result.length) return res.status(404).json({ "message": `The Id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new size
export const createSize = async (req, res) => {
    try {
        const { id_producto, size, estado } = req.body;
        const [result] = await pool.query('INSERT INTO Sizes(size, estado, id_producto)VALUES(?,?,?)', [size, estado, id_producto]);
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new size)" });
        res.json({
            id: result.insertId,
            size,
            estado,
            id_producto
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Update the data of a size with a params id
export const updateSize = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('UPDATE Sizes SET ? WHERE id = ?', [req.body, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a size with Id ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a size 
export const deleteSize = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`DELETE FROM Sizes WHERE id = ?`, [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a size with Id ${id})` });
        res.json({ "message": `Size with Id ${id} was delete` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}