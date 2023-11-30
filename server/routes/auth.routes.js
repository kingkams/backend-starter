import express from 'express';
import authCrtl from '../controllers/auth.controllers.js'

const router =express.Router();
router.route('/auth/sign-in')
.post(authCrtl.signIn)

router.route('/auth/sign-out')
    .get(authCrtl.signOut)

export default router;