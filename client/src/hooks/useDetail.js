import { createDetail } from "../api/details";

export const useDetail = () => {
    const generateDetailOrder = (list, pedidoId, token) => {
        list.forEach(async element => {
            try {
                const data = {
                    id_producto: element.id_producto,
                    unidades: element.unidades,
                    descuento: element.descuento,
                    size: element.size,
                    color: element.color,
                    subtotal: element.total,
                    id_pedido: pedidoId
                }
                await createDetail(data, token);
            } catch (error) {
                console.log(error)
            }
        });
    }

    return {generateDetailOrder}
}