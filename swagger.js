const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json'; 
const endpointsFiles = ['./Src/Routes/index.js', './Src/Routes/ProductRoutes.js', './Src/Routes/EspCommunicationRoutes.js', './Src/Routes/EspUsersRoutes.js'];


swaggerAutogen(outputFile, endpointsFiles);
