const axios = require('axios');
const coinMarketcapHost = process.env.COINMARKETCAP__HOST
const token = process.env.COINMARKETCAP__TOKEN

const metaDataCrypto = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${coinMarketcapHost}/v2/cryptocurrency/info`,
            headers:{
                "X-CMC_PRO_API_KEY": token
            },
            params: {
                id
            }
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
}

module.exports = {metaDataCrypto}