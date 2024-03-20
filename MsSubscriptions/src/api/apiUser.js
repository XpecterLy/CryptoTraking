const axios = require('axios');
const msUserHost = process.env.MSUSER_HOST

const verifyUser = (token, userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${msUserHost}/user`,
            headers:{
                Authorization: token
            },
            params: {
                userId
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

module.exports = {verifyUser}