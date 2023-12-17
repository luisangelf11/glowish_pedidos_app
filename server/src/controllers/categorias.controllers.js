import pool from '../database/database.js';

//Select all categorys in the database
export const getCategorias = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Categorias');
        if (!result.length) return res.status(404).json({ "message": "The table don't have data" });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Find a category with the params id
export const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM Categorias WHERE Id = ?', [id]);
        if (!result.length) return res.status(404).json({ "message": `The Id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new category 
export const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [result] = await pool.query('INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new category)" });
        res.json({
            id: result.insertId,
            nombre,
            descripcion
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Edit a category with a prams id
export const updateCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const { id } = req.params;
        const [result] = await pool.query('UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a category with Id ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a category that exists in the table
export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM Categorias WHERE id = ?', [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a category with Id ${id})` });
        res.json({ "message": `Category with Id ${id} was delete` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
} 