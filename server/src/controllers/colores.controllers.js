import pool from "../database/database.js";

//Get all colors
export const getColores = async (req, res) => {
    try {
        const { id_producto, limit, offset } = req.query;
        //if the query have an id_product use a filter for this id_product
        if ((!limit && !offset) && id_producto) {
            const [result] = await pool.query('SELECT * FROM Colores WHERE Id_Producto = ?', [id_producto]);
            /* if (!result.length) return res.status(404).json({ "message": "The table don't have data" }); */
            res.json(result);
        } else if(limit && offset) {
            const [result] = await pool.query(`SELECT * FROM Colores ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            /* if (!result.length) return res.status(404).json({ "message": "The table don't have data" }); */
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a color for her id
export const getColor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM Colores WHERE id = ?', [id]);
        if (!result.length) return res.status(404).json({ "message": `The Id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get colors available
export const getColorDisponibles =async(req, res)=>{
    try{
        const {id_producto} = req.query;
        if(id_producto){
            const [result] = await pool.query('SELECT * FROM Colores WHERE Id_Producto = ? AND Estado = ?', [id_producto, "Disponible"]);
            res.json(result)
        }else res.status(404).json({"message": "The params query is not exist"});
    }
    catch(err){
        res.status(500).json({ "message": err.message });
    }
}


//Create a new color
export const createColor = async (req, res) => {
    try {
        const { id_producto, color, estado, rgb } = req.body;
        const [result] = await pool.query('INSERT INTO Colores(color, rgb,estado, id_producto)VALUES(?,?,?,?)', [color, rgb,estado, id_producto]);
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new color)" });
        res.json({
            id: result.insertId,
            color,
            rgb,
            estado,
            id_producto
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Update the data of a color with a params id
export const updateColor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('UPDATE Colores SET ? WHERE id = ?', [req.body, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a color with Id ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a color 
export const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`DELETE FROM Colores WHERE id = ?`, [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a color with Id ${id})` });
        res.json({ "message": `Color with Id ${id} was delete` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}