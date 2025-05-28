const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {laptopSchema} = require('../helpers/validation_schema');
const createError = require('http-errors');

const getAll = async (req, res) => {
    //#swagger.tags=['Laptops']
    const result = await mongodb.getDatabase().db().collection('laptops').find();
    result.toArray().then((laptops) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(laptops)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Laptops']
    try{
        const laptopId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection('laptops').find({_id: laptopId});

        result.toArray().then((laptops) => {
            res.setHeader('Content-Type', 'application/json');      
            try {
                if(laptops[0] == undefined){
                    throw createError(404, 'This laptop does not exist')
                }
                res.json(laptops[0])  
            }
            catch (error) {
                res.status(404).send(error)
            }
        });
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid Laptop id'))
    }
    
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
 
    try {
        const result = await laptopSchema.validateAsync(laptop);   
        const response = await mongodb.getDatabase().db().collection('laptops').insertOne(laptop);
        if (response.acknowledged) {
            res.status(204).send();
        }
    }
    catch (error) {
        if (error.name === 'ValidationError'){
            res.status(422).send(createError(422, error.message))
            return
        }
        res.status(404).send(error)
    }
}

const updateLaptop = async (req,res) => {
    //#swagger.tags=['Laptops']
    try{
        const laptopId = new ObjectId(req.params.id)
        const laptop = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price,
            display: req.body.display,
            graphicsCard: req.body.graphicsCard,
        }
        try {
            const result = await laptopSchema.validateAsync(laptop);   
            const response = await mongodb.getDatabase().db().collection('laptops').replaceOne({ _id: laptopId }, laptop);
            if (response.modifiedCount > 0) {
                res.status(204).send();
            }
        }
        catch (error) {
            if (error.name === 'ValidationError'){
                res.status(422).send(createError(422, error.message))
                return
            }
            res.status(404).send(createError(404, 'The laptop you are trying to update does not exist'))
        };
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid Laptop id'))
    }    
}

const deleteLaptop = async (req,res) => {
    //#swagger.tags=['Laptops']
    try{
        const laptopId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db().collection('laptops').deleteOne({ _id:laptopId });
        try {
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else{
            throw createError(404, 'The laptop that you are trying to delete does not exist')
        }
    }
    catch (error) {
        res.status(404).send(error)
    }
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid Laptop id'))
    }    
}

module.exports = {
    getAll,
    getSingle,
    createLaptop,
    updateLaptop,
    deleteLaptop,
}