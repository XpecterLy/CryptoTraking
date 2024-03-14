const express = require('express');
const app = express();
require('dotenv').config()
const { routesV1 } = require('./src/routes/routes');
const connectToDatabase = require('./src/config/db')
const {registerUser, getDateNow} = require('./src/services/authService')



app.use(express.json());
connectToDatabase();

routesV1(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    createUserAdminIfNotExist();
});

const createUserAdminIfNotExist = () => {
    try {
        const userRoot = { 
            firstName: "root", 
            lastName: "root", 
            password: "root", 
            identificationNumber: "1234567890", 
            birthDate: "1950-01-01",
            activate: true,
            rol: "admin"
        };

        registerUser(userRoot);
    } catch (error) {
        // Validate if error is duplicate parameter identificationNumber 'admin'
        if (error.code === 11000 && error.keyPattern && error.keyPattern.identificationNumber >= 1) {
           console.log("User root exist");
        }
        else{
            console.error('Error:', error.message);
        }
    }
}