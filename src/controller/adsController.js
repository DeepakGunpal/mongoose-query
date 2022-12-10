const adsModel = require('../model/adsModel.js');
const companyModel = require('../model/companyModel.js');
const handleErrors = require('../util/errorHandler.js');

const createAd = async (req, res) => {
    try {
        if (!req.body.companyName) throw Error("Company name is mandatory");
        const company = await companyModel.findOne({ name: req.body.companyName });
        if (company) req.body.companyId = company._id;
        else {
            const newCompany = await companyModel.create({ name: req.body.companyName, url: req.body.url ? req.body.url : req.body.companyName.split(" ").join("").trim() + '.com' });
            req.body.companyId = newCompany._id;
        }
        const product = await adsModel.create(req.body);
        res.status(201).send({ status: true, data: product });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).send({ status: false, message: err });
    }
}

const getAllProduct = async (req, res) => {
    try {
        let result = [];
        //todo all ads for default home page
        if (!req.query.input) {
            result = await adsModel.aggregate([
                {
                    $lookup:
                    {
                        from: "companies",
                        localField: "companyId",
                        foreignField: "_id",
                        as: "company"
                    }
                },
                {
                    $unwind: "$company"
                },
                {
                    $sort: { createdAt: -1 }

                }

            ]);

        } else {

            result = await adsModel.aggregate([
                {
                    $lookup: {
                        from: "companies",
                        localField: "companyId",
                        foreignField: "_id",
                        as: "company"
                    }
                },
                {
                    $unwind: "$company"
                },
                {
                    $match: {
                        $or: [
                            { "company.name": { $regex: req.query.input, $options: "i" } },
                            { "primaryText": { $regex: req.query.input, $options: "i" } },
                            { "headline": { $regex: req.query.input, $options: "i" } },
                            { "description": { $regex: req.query.input, $options: "i" } },
                        ]
                    }
                },
                {
                    $sort: { createdAt: -1 }

                }
            ])

        }

        res.status(200).send({ status: true, data: result });

    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, message: error.message });
    }
}


module.exports = { createAd, getAllProduct };