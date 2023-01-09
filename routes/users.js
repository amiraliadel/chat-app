import express from 'express';
import {registerValidation, loginValidation, searchValidation} from '../helpers/validation.js';
import register from '../controllers/users/register.js';
import login from '../controllers/users/login.js';
import logout from '../controllers/users/logout.js';
const router = express.Router();

// register route.
router.post('/register', registerValidation, register);

// login route.
router.post('/login', loginValidation, login);

// logout route.
router.get('/logout', (req, res) => {
    res.send('logout route');
});

// user data route.
router.get('/userData', logout);

// search route.
router.post('/search', (req, res) => {
    res.send('search route');
});
export default router;