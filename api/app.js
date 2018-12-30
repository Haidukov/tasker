const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/auth');
const { PORT, MONGODB_URI } = require('./config');
const app = express();

const server = http.createServer(app);

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

server.listen(PORT, () => {
    console.log(`App is listening on ${server.address().port}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection at: ${promise}`);
    console.error(`Reason: ${reason}`)
})