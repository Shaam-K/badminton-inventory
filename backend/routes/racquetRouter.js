const racquetController = require('../controllers/racquetController')
const {Router} = require('express');
const racquetRouter = Router();
const upload = require('../utils/Upload')

racquetRouter.get('/', racquetController.getAllRacquetsGet);
racquetRouter.get('/weights', racquetController.getWeightsGet);
racquetRouter.get('/grips', racquetController.getGripsGet);
racquetRouter.get('/balance', racquetController.getBalancePointsGet);
racquetRouter.get('/:id/get', racquetController.getRacquetByIdGet);
racquetRouter.post('/create', upload.single("racquet_image"), racquetController.insertRacquetPost);
racquetRouter.post('/filter', racquetController.filterRacquetsPost)

racquetRouter.put('/:id/update', upload.single("racquet_image"), racquetController.updateRacquetPut);
racquetRouter.delete('/:id/delete', racquetController.deleteRacquetDelete);
racquetRouter.post('/:id/grips-add', racquetController.addGripsToRacquetPost);
racquetRouter.post('/:id/weights-add', racquetController.addWeightOptionsPost);
racquetRouter.delete('/:id/grips-delete', racquetController.deleteAllGripsRacquetDelete);
racquetRouter.delete('/:id/weights-delete', racquetController.deleteAllWeightsRacquetDelete);
racquetRouter.put('/:id/grips-update', racquetController.updateGripsRacquetPut);
racquetRouter.put('/:id/weights-update', racquetController.updateWeightsRacquetPut);


module.exports = racquetRouter;