const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/route/route');
require('dotenv/config');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log('listening on port ' + PORT)))
    .catch((error) => console.log('error: ' + error.message));

