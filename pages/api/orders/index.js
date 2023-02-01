// import client from "@binance/connector/src/APIBase";
const {Spot} =  require("@binance/connector");


const wsConnectionSample = () => {
    let price = 0;
    const client = new Spot(process.env.API_KEY, process.env.SECRET_KEY)

    const callbacks = {
        open: () => console.log('Connected with Websocket server'),
        close: () => console.log('Disconnected with Websocket server'),
        message: data => {
            price = data.p
        }
    }

    client.aggTradeWS('USDTUAH', callbacks)
}

wsConnectionSample()