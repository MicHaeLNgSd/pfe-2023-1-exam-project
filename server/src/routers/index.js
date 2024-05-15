const rootRouter = require('express').Router();
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const contestRouter = require('./contestRouter');

rootRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);
rootRouter.post('/login', validators.validateLogin, userController.login);
rootRouter.post('/getUser', checkToken.checkAuth);

rootRouter.use(checkToken.checkToken);
rootRouter.use('/contests', contestRouter);

rootRouter.post('/dataForContest', contestController.dataForContest);
rootRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);
rootRouter.get('/downloadFile/:fileName', contestController.downloadFile);
rootRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);
rootRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);
rootRouter.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
rootRouter.post('/updateUser', upload.uploadAvatar, userController.updateUser);
rootRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);
rootRouter.post('/newMessage', chatController.addMessage);
rootRouter.post('/getChat', chatController.getChat);
rootRouter.post('/getPreview', chatController.getPreview);
rootRouter.post('/blackList', chatController.blackList);
rootRouter.post('/favorite', chatController.favoriteChat);
rootRouter.post('/createCatalog', chatController.createCatalog);
rootRouter.post('/updateNameCatalog', chatController.updateNameCatalog);
rootRouter.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);
rootRouter.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);
rootRouter.post('/deleteCatalog', chatController.deleteCatalog);
rootRouter.post('/getCatalogs', chatController.getCatalogs);

module.exports = rootRouter;
