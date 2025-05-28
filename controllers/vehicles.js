const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {vehicleSchema} = require('../helpers/validation_schema');
const createError = require('http-errors');

const getAll = async (req, res) => {
    //#swagger.tags=['Vehicles']
    const result = await mongodb.getDatabase().db().collection('vehicles').find();
    result.toArray().then((vehicles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vehicles)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Vehicles']
    try{
        const vehicleId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection('vehicles').find({_id: vehicleId});

        result.toArray().then((vehicles) => {
            res.setHeader('Content-Type', 'application/json');      
            try {
                if(vehicles[0] == undefined){
                    throw createError(404, 'This vehicle does not exist')
                }
                res.json(vehicles[0])  
            }
            catch (error) {
                res.status(404).send(error)
            }
        });
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid Vehicle id'))
    }
    
};

const createVehicle = async (req,res) => {
    //#swagger.tags=['Vehicles']
    const vehicle = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        modelYear: req.body.modelYear,
        color: req.body.color,
        price: req.body.price,
    }
 
    try {
        const result = await vehicleSchema.validateAsync(vehicle);   
        const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle);
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

const updateVehicle = async (req,res) => {
    //#swagger.tags=['Vehicles']
    try{
        const vehicleId = new ObjectId(req.params.id)
        const vehicle = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            modelYear: req.body.modelYear,
            color: req.body.color,
            price: req.body.price,
        }
        try {
            const result = await vehicleSchema.validateAsync(vehicle);   
            const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({ _id: vehicleId }, vehicle);
            if (response.modifiedCount > 0) {
                res.status(204).send();
            }
        }
        catch (error) {
            if (error.name === 'ValidationError'){
                res.status(422).send(createError(422, error.message))
                return
            }
            res.status(404).send(createError(404, 'The vehicle you are trying to update does not exist'))
        };
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid vehicle id'))
    }


    
}

const deleteVehicle = async (req,res) => {
    //#swagger.tags=['Vehicles']
    try{
        const vehicleId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id:vehicleId });
        try {
            if (response.deletedCount > 0) {
                res.status(204).send();
            }
            else{
                throw createError(404, 'The vehicle that you are trying to delete does not exist')
            }
        }
        catch (error) {
            res.status(404).send(error)
        }
    }
    catch (error) {
        res.status(400).send(createError(400, 'Invalid vehicle id'))
    }    
}

module.exports = {
    getAll,
    getSingle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
}