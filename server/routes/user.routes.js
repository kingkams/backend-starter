import express from 'express'
import useCtrl from '../controllers/user.controllers.js'
import authCtrl from '../controllers/auth.controllers.js'


const router = express.Router()
router.route('/api/users')
    .get(useCtrl.list)
    .post(useCtrl.create)
router.route('/api/users/:userid')
    .get(authCtrl.requireSignIn,useCtrl.read)
    .put(authCtrl.requireSignIn, authCtrl.hasAuth, useCtrl.update)
    .delete(authCtrl.requireSignIn, authCtrl.hasAuth, useCtrl.deleteUser)
router.param('userid',useCtrl.userByID)
export default router;