import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'angel123',
    database: 'Glowish_Pedidos_App'
});

export default pool;