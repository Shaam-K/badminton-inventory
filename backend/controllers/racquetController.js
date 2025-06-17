const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const { getAllRacquets, getRacquetById, insertRacquet, updateRacquet, deleteRacquet, addGripOptions, deleteAllGripsRacquet, updateGripsRacquet, addWeightOptions, deleteAllWeightOptions, updateWeightsRacquet, getWeights, getGrips, getBalancePoints, filterRacquets } = require('../db/racquetQueries')
exports.getAllRacquetsGet = asyncHandler(async (req, res) => {
    const racquets = await getAllRacquets();

    if (!racquets || racquets.length == 0) {
        throw new Error('No racquets in DB');
    }
    return res.status(200).json({ data: racquets });
})

exports.getRacquetByIdGet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const racquet = await getRacquetById(id);

    if (!racquet || racquet.length == 0) {
        throw new Error(`Racquet with ${id} does not exist`);
    }

    return res.status(200).json({ data: racquet });
})

exports.insertRacquetPost = asyncHandler(async (req, res) => {
    const { racquet_name, brand_id, balance_point, grip_sizes, weights } = req.body;
    const image_path = req.file.filename;
    const int_branded = parseInt(brand_id, 10);

    const racquet = await insertRacquet(racquet_name, int_branded, balance_point, image_path, grip_sizes, weights);

    if (!racquet || racquet.length == 0) {
        throw new Error('Unable to create racquet');
    }

    return res.status(200).json({ data: racquet });
});

// exports.uploadRacquetImage = (req, res) => {
//     return res.status(200).json({data: "image uploaded successfuly"});
// }

exports.updateRacquetPut = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { racquet_name, brand_id, balance_point, grip_sizes, weights, old_image } = req.body;

    let image_path;

    if (req.file && old_image) {
        image_path = req.file.filename;
        const oldImagePath = path.join(global.appRoot, "uploads", old_image);
        
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    } else {
        image_path = old_image;
    }

    const int_branded = parseInt(brand_id, 10);

    const racquet = await updateRacquet(id, racquet_name, int_branded, balance_point, image_path, grip_sizes, weights);

    if (!racquet || racquet.length == 0) {
        throw new Error('Unable to update racquet');
    }
    return res.status(200).json({ data: racquet });
})

exports.deleteRacquetDelete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted_racquet = await deleteRacquet(id);
    const image_name = deleted_racquet.image_path;

    const image_path = path.join(global.appRoot, "uploads", image_name);

    if (fs.existsSync(image_path)) {
        fs.unlinkSync(image_path);
    }

    if (!deleted_racquet || deleted_racquet.length == 0) {
        throw new Error(`Unable to delete Racquet with id: ${id}`);
    }

    return res.status(200).json({ data: deleted_racquet });
})

exports.addGripsToRacquetPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { grip_sizes } = req.body;

    const added = await addGripOptions(id, grip_sizes);

    if (!added || added.length == 0) {
        throw new Error(`Unable to add grips for id: ${id}`);
    }

    return res.status(200).json({ data: added });
})

exports.deleteAllGripsRacquetDelete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted_grips = await deleteAllGripsRacquet(id);

    if (!deleted_grips || deleted_grips.length == 0) {
        throw new Error(`Unable to delete grips for id: ${id}`);
    }

    return res.status(200).json({ data: deleted_grips });
})


exports.updateGripsRacquetPut = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { grip_sizes } = req.body;
    const updated_grips = await updateGripsRacquet(id, grip_sizes);

    if (!updated_grips || updated_grips.length == 0) {
        throw new Error(`Unable to delete grips for id: ${id}`);
    }

    return res.status(200).json({ data: updated_grips });
})

exports.addWeightOptionsPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { weights } = req.body;
    const added = await addWeightOptions(id, weights);

    if (!added || added.length == 0) {
        throw new Error(`Unable to add weights for id: ${id}`)
    }

    return res.status(200).json({ data: added });
})


exports.deleteAllWeightsRacquetDelete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted_weights = await deleteAllWeightOptions(id);

    if (!deleted_weights || deleted_weights.length == 0) {
        throw new Error(`Unable to add weights for id: ${id}`)
    }

    return res.status(200).json({ data: deleted_weights });
})


exports.updateWeightsRacquetPut = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { weights } = req.body;
    const updated_weights = await updateWeightsRacquet(id, weights);

    if (!updated_weights || updated_weights.length == 0) {
        throw new Error(`Unable to delete grips for id: ${id}`);
    }

    return res.status(200).json({ data: updated_weights });
})

exports.getWeightsGet = asyncHandler(async (req, res) => {
    const weights = await getWeights();

    if (!weights) {
        throw new Error(`No weights in DB`);
    }

    return res.status(200).json({ data: weights })
})

exports.getGripsGet = asyncHandler(async (req, res) => {
    const grips = await getGrips();

    if (!grips) {
        throw new Error(`No grips in DB`);
    }

    return res.status(200).json({ data: grips })
})

exports.getBalancePointsGet = asyncHandler(async (req, res) => {
    const balance = await getBalancePoints();

    if (!balance) {
        throw new Error(`No balance in DB`);
    }

    return res.status(200).json({ data: balance })
})

exports.filterRacquetsPost = asyncHandler(async (req, res) => {
    const { brand, weight, grip, balances } = req.body;

    const filtered_racquets = await filterRacquets(brand, weight, grip, balances);

    if (!filtered_racquets) {
        throw new Error(`Unable to filter`);
    }

    return res.status(200).json({ data: filtered_racquets })
})

