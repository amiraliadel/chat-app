import express from 'express';
import {registerValidation, loginValidation, searchValidation} from '../helpers/validation.js';
import decodeJwtToken from '../middlewares/decodeJwtToken.js';
import register from '../controllers/users/register.js';
import login from '../controllers/users/login.js';
import logout from '../controllers/users/logout.js';
import userData from '../controllers/users/userData.js';
const router = express.Router();

// register route.
router.post('/register', registerValidation, register);

// login route.
router.post('/login', loginValidation, login);

// logout route.
router.get('/logout', logout);

// user data route.
router.get('/userData', decodeJwtToken, userData);

// search route.
router.post('/search', (req, res) => {
    res.send('search route');
});
export default router;