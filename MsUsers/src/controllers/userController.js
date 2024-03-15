const {registerUser} = require('../services/authService')
const {GetUserByIdUser, GetUserByIdentificationNumber, SearchAllUser, PatchRegisterUser, DeleteRegisterUser} = require('../services/userService')

const RegisterUser = async (req, res) => {
    const { 
        firstName, 
        lastName, 
        password, 
        identificationNumber, 
        birthDate
    } = req.body;

    try {
        var createUserJson = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            identificationNumber: identificationNumber,
            birthDate: birthDate,
            activate: true,
            rol: "user"
        }

        await registerUser(createUserJson)
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error.code, error.message);
        
        // Validate if error is duplicate parameter identificationNumber
        if (error.code === 11000) {
            res.status(400).send({message: `Identification number ${identificationNumber} is already registered`});
        }
        else{
            console.error('Error:', error.message);
            res.status(500).send({message: error.message});
        }
    }
}

const GetUser = async (req, res) => {
    try {
        const {userId, identificationNumber} = req.query;

        if(!userId && !identificationNumber)
            res.status(400).send({message: "Please specify search parameter 'userId' or 'identificationNumber'"})

        if(userId){
            const getUser = new GetUserByIdUser();
            var user = await getUser.searchUser(userId);
            return res.status(200).send(user)
        }else if(identificationNumber){
            const getUser = new GetUserByIdentificationNumber();
            var user = await getUser.searchUser(identificationNumber);
            return res.status(200).send(user)
        }
    } catch (error) {
        console.log(error.code, error.message);
        if(error.code === 404){
            return res.status(error.code).send({message: error.message})
        }else{
            return res.status(500).send({message: "Internal server error"})
        }
    }
}

const GetAllUser = async (req, res) => {
    try {
        const {rol, activate} = req.query;
        const user = await SearchAllUser(rol, activate);
        res.status(200).json(user)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({message: error.message});
    }
}

const PatchUser = async (req, res) => {
    try {
        const {userId} = req.query;
        const userData = { 
            firstName, 
            lastName, 
            password, 
            identificationNumber, 
            birthDate,
            activate
        } = req.body;
        await PatchRegisterUser(userId, userData)
        res.status(200).json();
    } catch (error) {
        console.log(error.code, error.message);
        if(error.code === 404 || error.code === 404){
            res.status(error.code).json({message: error.message});
        }else{
            res.status(500).json({message: error.message});
        }
    }
}

const DeleteUser = async (req, res) => {
    try {
        const {userId} = req.query;

        await DeleteRegisterUser(userId)
    
        res.status(200).json();
    } catch (error) {
        console.log(error.code, error.message);
        if(error.code === 404 || error.code === 404){
            res.status(error.code).json({message: error.message});
        }else{
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = { RegisterUser, GetUser, GetAllUser, PatchUser, DeleteUser }