const bodyValidationMiddleware = (schemaObject) => {
    return (req, res, next) => {
        const { error } = schemaObject.validate(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    };
};

const queryValidationMiddleware = (schemaObject) => {
    return (req, res, next) => {
        const { error } = schemaObject.validate(req.query);
        if (error) {
            console.log(error.details);
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = {bodyValidationMiddleware, queryValidationMiddleware}