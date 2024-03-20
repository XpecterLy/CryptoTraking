const routesSubscriber = require('./v1/subscriberRoutes');

const signature = '/v1/crypto';

const routesV1 = (app) => {
    app.use(`${signature}/subscriber/`, routesSubscriber);
};

module.exports = {
    routesV1,
};