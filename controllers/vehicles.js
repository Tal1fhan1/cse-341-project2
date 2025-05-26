const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {vehicleSchema} = require('../helpers/validation_schema');

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
    const vehicleId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('vehicles').find({_id: vehicleId});
    result.toArray().then((vehicles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vehicles[0])
    });
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

    const result = await vehicleSchema.validateAsync(vehicle);
    console.log(result);

    const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while creating the vehicle.');
    }
}

const updateVehicle = async (req,res) => {
    //#swagger.tags=['Vehicles']
    const vehicleId = new ObjectId(req.params.id)
    const vehicle = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        modelYear: req.body.modelYear,
        color: req.body.color,
        price: req.body.price,
    }

    const result = await vehicleSchema.validateAsync(vehicle);
    console.log(result);

    const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({ _id: vehicleId }, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while updating the vehicle.');
    }
}

const deleteVehicle = async (req,res) => {
    //#swagger.tags=['Vehicles']
    const vehicleId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id:vehicleId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error occured while deleting the vehicle.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
}