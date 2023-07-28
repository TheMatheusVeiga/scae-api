//Main Instances
const { errorHandler } = require('./Middlewares/errorMiddleware');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const app = express();
const dotenv = require("dotenv")
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../Swagger/swagger_output.json');

//Middlewares Configuration
app.use(errorHandler);

//Gzip Configuration
app.use(compression());

//Express Request Type
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));

//CORS Configuration
app.use(cors())
app.options('*', cors());

//Environmet Configuration
dotenv.config()

//Api Routes:
const index = require('./Routes/index.js');
const productRoute = require('./Routes/ProductRoutes.js');
const espCommunicationRoute = require('./Routes/EspCommunicationRoutes.js');
const espUsers = require('./Routes/EspUsersRoutes.js');

app.use(index);
app.use('/api/', productRoute);
app.use('/api/', espCommunicationRoute);
app.use('/api/', espUsers);

//Swagger Setup
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerFile));

module.exports = app;
