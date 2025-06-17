const {getAllBrands, insertBrand, updateBrand, deleteBrand} = require('../db/brandQueries');
const asyncHandler = require('express-async-handler');

exports.allBrandsGet = asyncHandler(async (req,res) => {
    const brands = await getAllBrands();
    if (!brands || brands.length == 0) {
        throw new Error("Unable to fetch data");
    }
    res.status(200).json({data: brands});
});

exports.insertBrandPost = asyncHandler(async (req,res) => {
    const { brand } = req.body;
    const inserted = await insertBrand(brand);

    if (!inserted || inserted.length == 0) {
        throw new Error(`Unable to insert ${brand}`);
    }
    res.status(200).json({data: inserted});
})

exports.updateBrandPut = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const {brand} = req.body;
    const updated = await updateBrand(id,brand);

    if (!updated || updated.length == 0) {
        throw new Error(`Unable to update id: ${id}`);
    }
    res.status(200).json({data: updated});
})

exports.deleteBrandDelete = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const deleted = await deleteBrand(id);

    if (!deleted || deleted.length) {
        throw new Error(`Unable to delete id: ${id}`);
    }
    res.status(200).json({data: deleted});
})
