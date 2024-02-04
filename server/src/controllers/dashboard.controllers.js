import pool from '../database/database.js';

//Get the 5 products with more orders
export const chartFiveProducts = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT id_producto, SUM(unidades) as total_pedido
        FROM detalle
        GROUP BY id_producto
        ORDER BY total_pedido DESC
        LIMIT 5
        `);
        if (!result.length) return res.status(404).json({ "message": "Server not found th five products with more orders" });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get the orders with state "SEND" and "DELIVERED"
export const ordersStatus = async (req, res) => {
    try {
        const [send] = await pool.query(`SELECT COUNT(*) as total_pedidos_enviados
        FROM pedidos
        WHERE Estado = 'Enviado';
        `);
        const [delivered] = await pool.query(`SELECT COUNT(*) as total_pedidos_entregados
        FROM pedidos
        WHERE Estado = 'Entregado';
        `);
        const [total] = await pool.query(`SELECT COUNT(*) as total_pedidos
        FROM pedidos;
        `);
        const [users] = await pool.query(`SELECT COUNT(*) as total_clientes
        FROM usuarios;
        `);
        res.json({ total_pedidos_enviados: send[0].total_pedidos_enviados, total_pedidos_entregados: delivered[0].total_pedidos_entregados, total_pedidos: total[0].total_pedidos, total_clientes: users[0].total_clientes });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}


//Get the top 5 of users more active with orders
export const besthUsers = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT id_usuario, COUNT(*) as total_pedidos
        FROM pedidos
        GROUP BY id_usuario
        ORDER BY total_pedidos DESC
        LIMIT 5;
        `);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get the top 5 date with more orders
export const dateMoreOrders = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT fecha, COUNT(*) as total_pedidos
        FROM pedidos
        GROUP BY fecha
        ORDER BY total_pedidos DESC
        LIMIT 5;
        `);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get the sum of column price and the sum of column units
export const productsColumnDashboard = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT SUM(precio * unidades) as Total_Inventario, SUM(unidades) as Total_Unidades
        FROM productos`);
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}