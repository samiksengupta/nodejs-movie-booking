const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { authenticate, authorize, authorizeRoles } = require('../middlewares/auth');
const validator = require('../middlewares/validators');

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route('/register').post(validator.authRegister, authController.register);
apiRouter.route('/login').post(validator.authLogin, authController.login);
apiRouter.route('/logout').post(authController.logout);
apiRouter.route('/refresh').post(validator.authRefresh, authController.refresh);

/* apiRouter.route('/movies').get();
apiRouter.route('/movies/:id').get();

apiRouter.route('/cinemas').get();
apiRouter.route('/cinemas/:id').get(); */

apiRouterSecure.use(authenticate);

apiRouterSecure.route('/users')
    .get(authorize, userController.index)
    .post(authorize, validator.userCreate, userController.create);

apiRouterSecure.route('/users/:id')
    .get(authorize, userController.read)
    .put(authorize, validator.userUpdate, userController.update)
    .delete(authorize, userController.destroy);

/* apiRouterSecure.route('/movies')
    .post(authorize, validator.userCreate, userController.create);

apiRouterSecure.route('/movies/:id')
    .put(authorize, validator.userUpdate, userController.update)
    .delete(authorize, userController.destroy); */

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};