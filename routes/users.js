import express from 'express';


const router = express.Router();

// register route.
router.post('/register', (req, res) => {
    res.send('register route');
});

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