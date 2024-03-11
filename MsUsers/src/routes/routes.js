const routesAuth = require('./v1/authRouter');
const routesUser = require('./v1/userRouter');

const signature = '/v1/crypto'

const routesV1 = (app) => {
    app.use(`${signature}/auth/`, routesAuth);
    app.use(`${signature}/user/`, routesUser);
};

module.exports = {
    routesV1,
};