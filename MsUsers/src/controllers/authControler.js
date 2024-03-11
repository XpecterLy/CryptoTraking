
const bcrypt = require('bcrypt');
const { userModel } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            password, 
            identificationNumber, 
            birthDate, 
            rol 
        } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        var createUserJson = {
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            identificationNumber: identificationNumber,
            birthDate: birthDate,
            createDate: getDateNow(),
            updateDate: getDateNow(),
            activate: true,
            rol: rol
        }

        console.log(createUserJson);
    
        var user = new userModel({...createUserJson});
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({message: error.messag})
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    res.status(200).json();
}

const getDateNow = () => {
    let fechaActual = new Date();

    let anio = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes ya que los meses van de 0 a 11
    let dia = String(fechaActual.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
}

module.exports = { register, login }