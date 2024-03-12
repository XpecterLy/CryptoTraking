const {registerUser, loginAuth, encryptPassword, comparePassword, createToken} = require('../services/authService')

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
         const hashedPassword = await encryptPassword(password)
    
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

const getDateNow = () => {
    try {
        let dateNow = new Date();

        let year = dateNow.getFullYear();
        let month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes ya que los meses van de 0 a 11
        let day = String(dateNow.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error when trying to get current date`, code: 500 }
    }
}

module.exports = { register, login }