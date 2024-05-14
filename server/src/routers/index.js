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

rootRouter.use('/contests', checkToken.checkToken, contestRouter);

rootRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

// rootRouter.use(checkToken.checkToken);

rootRouter.post('/login', validators.validateLogin, userController.login);

rootRouter.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest
);

rootRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

rootRouter.post('/getUser', checkToken.checkAuth);

rootRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
);

rootRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

rootRouter.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

rootRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

rootRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

rootRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

rootRouter.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage
);

rootRouter.post('/getChat', checkToken.checkToken, chatController.getChat);

rootRouter.post(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview
);

rootRouter.post('/blackList', checkToken.checkToken, chatController.blackList);

rootRouter.post(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat
);

rootRouter.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog
);

rootRouter.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog
);

rootRouter.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog
);

rootRouter.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog
);

rootRouter.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog
);

rootRouter.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs
);

module.exports = rootRouter;
