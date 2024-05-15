const contestRouter = require('express').Router();

const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter.get(
  '/customers/:customerId',
  contestController.getCustomersContests
);

contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest
);

module.exports = contestRouter;
