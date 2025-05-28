const joi = require('@hapi/joi')

const vehicleSchema = joi.object({
    manufacturer: joi.string().min(2).max(50).required(),
    model: joi.string().min(3).max(30).required(),
    modelYear: joi.number().required(),
    color: joi.string().min(3).max(20).required(),
    price: joi.string().min(5).max(10).required()
})

const laptopSchema = joi.object({
    manufacturer: joi.string().min(2).max(50).required(),
    model: joi.string().min(3).max(30).required(),
    price: joi.string().min(3).max(20).required(),
    display: joi.string().min(3).max(50).required(),
    graphicsCard: joi.string().min(5).max(50).required()
})

module.exports = {
    vehicleSchema,
    laptopSchema
}