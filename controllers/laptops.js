const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {laptopSchema} = require('../helpers/validation_schema');
const createError = require('http-errors')

const getAll = async (req, res) => {
    //#swagger.tags=['Laptops']
    const result = await mongodb.getDatabase().db().collection('laptops').find();
    result.toArray().then((laptops) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(laptops)
    });
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Laptops']
    const laptopId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('laptops').find({_id: laptopId});

    if (!result){
      throw createError(404, "Laptop does not exist")
    }
    
    result.toArray().then((laptops) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(laptops[0])
    });
};

const createLaptop = async (req,res) => {
    //#swagger.tags=['Laptops']
    const laptop = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price,
        display: req.body.display,
        graphicsCard: req.body.graphicsCard,
    }

    const result = await laptopSchema.validateAsync(laptop);
    console.log(result);
    
    const response = await mongodb.getDatabase().db().collection('laptops').insertOne(laptop);
    if (response.acknowledged) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while creating the laptop.');
    }
}

const updateLaptop = async (req,res) => {
    //#swagger.tags=['Laptops']
    const laptopId = new ObjectId(req.params.id)
    const laptop = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price,
        display: req.body.display,
        graphicsCard: req.body.graphicsCard,
    }

    const result = await laptopSchema.validateAsync(laptop);
    console.log(result);

    const response = await mongodb.getDatabase().db().collection('laptops').replaceOne({ _id: laptopId }, laptop);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while updating the laptop.');
    }
}

const deleteLaptop = async (req,res) => {
    //#swagger.tags=['Laptops']
    const laptopId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('laptops').deleteOne({ _id:laptopId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while deleting the laptop.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createLaptop,
    updateLaptop,
    deleteLaptop,
}