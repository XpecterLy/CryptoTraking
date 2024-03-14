const {registerUser, loginAuth, comparePassword, createToken} = require('../services/authService')

const register = async (req, res) => {
    const { 
        firstName, 
        lastName, 
        password, 
        identificationNumber, 
        birthDate, 
        rol 
    } = req.body;

    try {
        var createUserJson = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            identificationNumber: identificationNumber,
            birthDate: birthDate,
            activate: true,
            rol: rol
        }

        await registerUser(createUserJson)
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Validate if error is duplicate parameter identificationNumber
        if (error.code === 11000 && error.keyPattern && error.keyPattern.identificationNumber >= 1) {
            res.status(400).send({message: `Identification number ${identificationNumber} is already registered`});
        }
        else{
            console.error('Error:', error.message);
            res.status(500).send({message: error.message});
        }
    }
}

const login = async (req, res) => {
    try {
        const { identificationNumber, password } = req.body;

        user = await loginAuth(identificationNumber)

        if (!user) 
            return res.status(401).json({ error: 'Authentication failed' });
        
        if (! await comparePassword(password, user.password)) 
            return res.status(401).json({ error: 'Authentication failed' });
    
        const dataUserToken = { 
            userId: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            rol: user.rol 
        }

        const token = createToken(dataUserToken)

        res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
    }
}

module.exports = { register, login }