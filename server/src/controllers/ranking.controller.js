import pool from '../database/database.js'

//Get all rankings of a product
export const getRankings = async(req, res)=>{
    try{
        const {id_producto} = req.query;
        if(id_producto){
            const [result] = await pool.query(`SELECT * FROM Valoraciones WHERE id_producto = ?`, [id_producto]);
            res.json(result);
        }else{
            res.status(404).json({"message": "The query params is not exits"});
        }
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Validate a user ranking 
export const validationRanking = async(req, res)=>
{
    try{
        const {id_producto, id_usuario}=req.query;
        if(id_producto && id_usuario){
            const [result] = await pool.query(`SELECT * FROM Valoraciones WHERE id_producto = ? AND id_usuario=?`, [id_producto, id_usuario]);
            res.json(result);
        }else{
            res.status(404).json({"message": "The query params is not exits"});
        }
    
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Create a ranking for a product
export const createRanking = async(req,res)=>{
    try{
        const {id_producto, id_usuario, puntos} = req.body;
        const [result]=await pool.query(
            `INSERT INTO Valoraciones (id_producto, id_usuario, puntos)  VALUES (?, ?, ?)`, [id_producto, id_usuario, puntos])
        if(!result.affectedRows) return res.status(404).json({"message": `The ranking for product ${id_producto} not was created`});
        res.json(result);
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//Update a ranking with a params id
export const updateRanking = async(req,res)=>{
    try{
        const {id} = req.params;
        const [result]=await pool.query(
            `UPDATE Valoraciones SET ? WHERE id = ?`, [req.body, id])
        if(!result.affectedRows) return res.status(404).json({"message": `The ranking for product ${id_producto} not was updated`});
        res.json(result);
    }
    catch(err){
        res.status(500).json({"message": err.message});
    }
}

//For get the AVG of a ranking product
export const avgRanking = async(req, res)=>{
try{
    const {id_producto} = req.query;
    if(id_producto){
    const[result] =  await pool.query(
        `SELECT 
        SUM(Puntos) / COUNT(Puntos) as Promedio
        FROM Valoraciones 
        WHERE Id_Producto = ?
        group by Id_Producto`, [id_producto])
    res.json(result[0])
    }
    else{
        res.status(404).json({"message": "The query params is not exits"});
    }

}
catch(err){
        res.status(500).json({"message": err.message});
    }
}