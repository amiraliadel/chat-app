import express from 'express';
import {searchValidation} from '../helpers/validation.js';
import decodeJwtToken from '../middlewares/decodeJwtToken.js';
import send from '../controllers/requests/send.js';
import accept from '../controllers/requests/accept.js';
import remove from '../controllers/requests/remove.js';

const router = express.Router();

// send request.
router.post('/send', searchValidation, decodeJwtToken, send);

// accept request.
router.post('/accept', searchValidation, decodeJwtToken, accept);

// remove request.
router.post('/remove', searchValidation, decodeJwtToken, remove);

export default router;