const adsModel = require('../model/adsModel.js');
const companyModel = require('../model/companyModel.js');
const handleErrors = require('../util/errorHandler.js');

const createAd = async (req, res) => {
    try {
        if (!req.body.companyName) throw Error("Company name is mandatory");
        const company = await companyModel.findOne({ name: req.body.companyName });
        if (company) req.body.companyId = company._id;
        else {
            const newCompany = await companyModel.create({ name: req.body.companyName, url: req.body.companyName + '.com' });
            console.log(newCompany);
            req.body.companyId = newCompany._id;
        }
        const product = await adsModel.create(req.body);
        console.log(product);
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
            //todo search in all fields except companyName
            const getAds = await adsModel.aggregate([
                {
                    $match: { $text: { $search: req.query.input } }
                },
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
                }

            ]);

            //todo search by companyName
            const getCompany = await adsModel.aggregate([
                {
                    $lookup:
                    {
                        from: "companies",
                        localField: "companyId",
                        foreignField: "_id",
                        pipeline: [{
                            $match: { name: req.query.input }
                        }],
                        as: "company"
                    }
                },
                {
                    $unwind: "$company"
                }
            ])

            result = [...getAds, ...getCompany];
        }
        
        res.status(200).send({ status: true, data: result });

    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, message: error.message });
    }
}

module.exports = { createAd, getAllProduct };