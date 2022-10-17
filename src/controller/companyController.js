const companyModel = require('../model/companyModel.js');
const handleErrors = require('../util/errorHandler.js');

const createCompany = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.url) req.body.url = req.body.name + '.com';
        const company = await companyModel.create(req.body);
        res.status(201).send({ status: true, data: company });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).send({ status: false, message: err });
    }
}

module.exports = { createCompany };