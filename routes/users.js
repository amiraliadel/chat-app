import express from 'express';
import {registerValidation, loginValidation, searchValidation} from '../helpers/validation.js';
import register from '../controllers/users/register.js';

const router = express.Router();

// register route.
router.post('/register', registerValidation, register);

// login route.
router.post('/login', (req, res) => {
    res.send('login route');
});

// logout route.
router.get('/logout', (req, res) => {
    res.send('logout route');
});

// user data route.
router.get('/userData', (req, res) => {
    res.send('user data route');
});

// search route.
router.post('/search', (req, res) => {
    res.send('search route');
});
export default router;