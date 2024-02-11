import pool from '../database/database.js';

//Get all orders
export const getPedidos = async(req, res)=>{
    try{
        const {id_usuario, limit, offset, id } = req.query;
        //if id_usuario query exist execute this lines code
        if((!limit && !offset) && id_usuario){
            const [result] = await pool.query('SELECT * FROM Pedidos WHERE id_usuario = ?', [id_usuario]);
            /* if(!result.length) return res.status(404).json({"message": `This user dont have orders`}); */
            res.json(result);
        }else if(limit && offset){
            const [result] = await pool.query(`SELECT * FROM Pedidos ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            /* if(!result.length) return res.status(404).json({"message": `This table dont have data`}); */
            res.json(result);
        }else if(id){
            let filter = `${id}%`
            const [result] = await pool.query(`SELECT * FROM Pedidos WHERE id LIKE ?`, [filter]);
            res.json(result);
        }
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Get an order
export const getPedido = async(req, res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query('SELECT * FROM Pedidos WHERE id = ?', [id]);
        /* if(!result.length) return res.status(404).json({"message": `The Id ${id} is not found in the table`}); */
        res.json(result[0]);
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Craete a new order
export const createPedido = async(req, res)=>{
    try{
        const {fecha, monto, estado, id_usuario} = req.body;
        const [result] = await pool.query('INSERT INTO Pedidos (fecha, monto, estado, id_usuario) VALUES (?, ?, ?, ?)', [fecha, monto, estado, id_usuario]);
        if(!result.affectedRows) return res.status(404).json({"message": "Error in the query (create a new order)"});
        res.json({
            id: result.insertId,
            fecha, 
            monto,
            estado, 
            id_usuario
        });
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Update the data of an order with params id
export const updatePedido = async(req, res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query('UPDATE Pedidos SET ? WHERE id = ?', [req.body, id]);
        if(!result.affectedRows) return res.status(404).json({"message": `Error in the query (update an order with Id ${id})`});
        res.json(result);
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Delete an order with params id
export const deletePedido = async(req, res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query('DELETE FROM Pedidos WHERE id = ?', [id]);
        if(!result.affectedRows) return res.status(404).json({"message": `Error in the query (delete an order with Id ${id})`});
        res.json({"message": `Order with Id ${id} was deleted`});
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}