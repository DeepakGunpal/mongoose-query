const express = require('express');
const { createAd, getAllProduct } = require('../controller/adsController');
const { createCompany } = require('../controller/companyController');
const route = express.Router();

route.post('/createCompany', createCompany);
route.post('/createAd', createAd);
route.get('/getAllAds', getAllProduct);

module.exports = route;