import paypal from '@paypal/checkout-server-sdk'

const clientId = 'AZSnKN2nHdzqnu3nRXf1viTZQt7l8uALsSO1_B1WhvJIMEGjPoiWZdp2LThNf92oPgREKJFX41eM8zXi'
const clientSecret = 'ENU7WghMz7e4JaEL7CQihqbAaaC_zb-Gk_8uA116Ov0xI-zzvR6SbrrPJiqm2s-dXn1lOiq6ACqieR4K'

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export const createOrderCheckout = async (req, res) => {
    try {
        const {id_pedido, monto} = req.body;
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: monto,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: monto
                            }
                        }
                    },
                    items: [{
                        name: "Compra En Glowish Fashion App",
                        description: `Esta transacción fue realizada desde Glowish Fashion App. Por el pago del pedido con ID ${id_pedido}`,
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: monto
                        }
                    }]
                }
            ]
        })
        const response = await client.execute(request);
       return res.json({ "id": response.result.id });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}