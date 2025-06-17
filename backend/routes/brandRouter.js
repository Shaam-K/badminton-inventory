const { Router } = require('express');
const brandController = require('../controllers/brandController')
const brandRouter = Router();

brandRouter.get('/', brandController.allBrandsGet);
brandRouter.post('/create', brandController.insertBrandPost);
brandRouter.put('/:id/update', brandController.updateBrandPut);
brandRouter.delete('/:id/delete', brandController.deleteBrandDelete);


module.exports = brandRouter;
