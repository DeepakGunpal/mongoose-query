//?----------------------------- error handler ----------------------------

const handleErrors = (err) => {
    let errors = { error: "Invald Data" };
    // duplicate field error
    if (err.code === 11000) {
        errors[`${Object.keys(err.keyValue)[0]}`] = `${Object.keys(err.keyValue)[0]} is already registered`;
        return errors;
    }
    // validation errors
    if (err.message.includes('company validation failed')) {
        if (err.errors.properties) {
            Object.values(err.errors).forEach(({ properties }) => {
                console.log(properties);
                errors[properties.path] = properties.message;
            });
        }
    }
    // validation errors
    if (err.message.includes('ads validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports = handleErrors;