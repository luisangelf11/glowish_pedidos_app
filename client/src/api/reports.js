import axios from 'axios'

export const getProductReports = async () =>
    await axios.get(`http://localhost:3000/api/v1/productos`);

export const getDetailsReports = async (id_pedido) =>
    await axios.get(`http://localhost:3000/api/v1/detalle?id_pedido=${id_pedido}`);

export const getOrdersReport = async(from, to)=>
    await axios.get(`http://localhost:3000/api/v1/pedidos-fecha?from=${from}&to=${to}`);    