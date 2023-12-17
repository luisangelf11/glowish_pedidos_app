import pool from '../database/database.js'

//Get the products using the pagination or get every products
export const getProductos = async (req, res) => {
    try {
        const { limit, offset, name } = req.query;
        if ((!limit && !offset) && !name) {
            //If the query params is not exits execute a query that select all products 
            const [result] = await pool.query(`SELECT p.Id, p.Nombre, p.Descripcion, p.Unidades, p.Precio, p.Imagen, p.Descuento, c.Nombre AS Categoria FROM Productos AS p
            INNER JOIN Categorias AS c ON p.Id_Categoria = c.Id ORDER BY id DESC`);
            if (!result.length) return res.status(404).json({ "message": "The table don't have data" });
            res.json(result);
        }
        else if(limit && offset) {
            //If the query params exists execute a query that select the productos with a pagination
            const [result] = await pool.query(`SELECT p.Id, p.Nombre, p.Descripcion, p.Unidades, p.Precio, p.Imagen, p.Descuento, c.Nombre AS Categoria FROM Productos AS p
            INNER JOIN Categorias AS c ON p.Id_Categoria = c.Id ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            if (!result.length) return res.status(404).json({ "message": `The table don't have data (limit: ${limit})` });
            res.json(result);
        }else{
            //Filter the products with the name query
            let filter = `${name}%`
            const [result] = await pool.query(`SELECT p.Id, p.Nombre, p.Descripcion, p.Unidades, p.Precio, p.Imagen, p.Descuento, c.Nombre AS Categoria FROM Productos AS p
            INNER JOIN Categorias AS c ON p.Id_Categoria = c.Id WHERE nombre LIKE ? ORDER BY id DESC`, [filter]);
            if (!result.length) return res.status(404).json({ "message": `The product with name ${name} is not found` });
            res.json(result);
        }

    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a product with the params id
export const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT p.Id, p.Nombre, p.Descripcion, p.Unidades, p.Precio, p.Imagen, p.Descuento, c.Nombre AS Categoria FROM Productos AS p
        INNER JOIN Categorias AS c ON p.Id_Categoria = c.Id WHERE p.Id = ?`, [id]);
        if (!result.length) return res.status(404).json({ "message": `The Id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
} 

//Create a new product
export const createProducto = async(req, res)=>{
    try{
        const {nombre, descripcion, unidades, precio, imagen, descuento, id_categoria} = req.body;
        const [result] = await pool.query('INSERT INTO Productos (nombre, descripcion, unidades, precio, imagen, descuento, id_categoria) VALUES (?, ?, ? ,?, ?, ?, ?)', [nombre, descripcion, unidades, precio, imagen, descuento, id_categoria]);
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new product)" });
        res.json({
            id: result.insertId,
            nombre,
            descripcion, 
            unidades,
            precio,
            imagen, 
            descuento, 
            id_categoria
        });
    }
    catch(err){
        res.status(500).json({ "message": err.message });
    }
}

//Update a product with params id
export const updateProducto = async(req, res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query('UPDATE Productos SET ? WHERE id = ?', [req.body, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a product with Id ${id})` });
        res.json(result);
    }
    catch(err){
        res.status(500).json({ "message": err.message });
    }
}

//Delete a product with params  id
export const deleteProducto = async(req, res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query(`DELETE FROM Productos WHERE id = ?`, [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a product with Id ${id})`});
        res.json({ "message": `Product with Id ${id} was delete` });
    }
    catch(err){
        res.status(500).json({ "message": err.message });
    }
}