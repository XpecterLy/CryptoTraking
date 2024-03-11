const express = require('express');
const app = express();
require('dotenv').config()
const { routesV1 } = require('./src/routes/routes');
const connectToDatabase = require('./src/config/db')


app.use(express.json());
connectToDatabase();

routesV1(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});