const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Vehicles & Laptops API',
        description: 'API containing my vehicle and laptop wishlist :)'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputFile = './swagger.json'
const endpontsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpontsFiles, doc);