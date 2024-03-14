const {registerUser} = require('../services/authService')
const {GetUserByIdUser, GetUserByIdentificationNumber} = require('../services/userService')


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
        console.log(`Code erro: ${error.code}`);
        
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
        console.log(error.code);
        console.log(error.message);
        if(error.code === 404){
            return res.status(error.code).send({message: error.message})
        }else{
            return res.status(500).send({message: "Internal server error"})
        }
    }
}

const GetAllUser = (req, res) => {
    res.status(200).json()
}

const UpdateUser = (req, res) => {
    res.status(200).json()
}

const DeleteUser = (req, res) => {
    res.status(200).json()
}


module.exports = { RegisterUser, GetUser, GetAllUser, UpdateUser, DeleteUser }