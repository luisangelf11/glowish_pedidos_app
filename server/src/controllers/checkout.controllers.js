import paypal from '@paypal/checkout-server-sdk'

const clientId = 'AZSnKN2nHdzqnu3nRXf1viTZQt7l8uALsSO1_B1WhvJIMEGjPoiWZdp2LThNf92oPgREKJFX41eM8zXi'
const clientSecret = 'ENU7WghMz7e4JaEL7CQihqbAaaC_zb-Gk_8uA116Ov0xI-zzvR6SbrrPJiqm2s-dXn1lOiq6ACqieR4K'

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export const createOrderCheckout = async (req, res) => {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '100.00',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '100.00'
                            }
                        }
                    },
                    items: [{
                        name: "Book of react",
                        description: 'Description',
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: "100.00"
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