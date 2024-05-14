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
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest
);

contestRouter.get(
  '/customers/:customerId',
  contestController.getCustomersContests
);

module.exports = contestRouter;
