import pool from '../database/database.js';

//Get all details
export const getDetalles = async (req, res) => {
    try {
        const { id_pedido } = req.query;
        //if id_pedidio query exist execute this condition
        if (id_pedido) {
            const [result] = await pool.query('SELECT * FROM Detalle WHERE Id_Pedido = ?', [id_pedido]);
            if (!result.length) return res.status(404).json({ "message": `Not found the details for order with Id ${id}` });
            res.json(result);
        } else {
            const [result] = await pool.query('SELECT * FROM Detalle');
            if (!result.length) return res.status(404).json({ "message": "This table dont have data" });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a details with params id
export const getDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM Detalle WHERE id = ?', [id]);
        if (!result.length) return res.status(404).json({ "message": `The detail with id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new detail for an order
export const createDetalle = async (req, res) => {
    try {
        const { id_producto, unidades, descuento, size, color, subtotal, id_pedido } = req.body;
        const [result] = await pool.query('INSERT INTO Detalle (id_producto, unidades, descuento, size, color, subtotal, id_pedido) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_producto, unidades, descuento, size, color, subtotal, id_pedido]);
        const [updateProducts] = await pool.query(`UPDATE Productos SET Unidades = Unidades - ? WHERE id = ?`, [unidades, id_producto]);
        if (!updateProducts.affectedRows) return res.status(404).json({ "message": `Error to update the producto width Id ${id_producto}` });
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new detail)" });
        res.json({
            id: result.insertId,
            id_producto,
            unidades,
            descuento,
            size,
            color,
            subtotal,
            id_pedido
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Update the data of a detail with params id
export const updateDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('UPDATE Detalle SET ? WHERE id = ?', [req.body, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a detail with Id ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a detail with params id
export const deleteDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { cancel } = req.query;
        if (cancel) {
            //if cancelDetail is true the table productos will be update in the column units 
            //units = units + units - units details
            //endpoint: /api/v1/detalle/:id?cancel=true
            const [detail] = await pool.query('SELECT * FROM Detalle WHERE Id = ?', [id]);
            console.log(detail);
            //Update the product
            const [updateProducts] = await pool.query('UPDATE Productos SET Unidades = Unidades + ? WHERE id = ?', [detail[0].Unidades, detail[0].Id_Producto]);
        }
        //Delete the datil
        const [result] = await pool.query('DELETE FROM Detalle WHERE Id = ?', [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a detail with Id ${id})` });
        res.json({ "message": `Detail with Id ${id} was deleted` });

    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}