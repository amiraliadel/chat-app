import {body} from 'express-validator';

const firstname = body('firstname')
                .not().isEmpty()
                .withMessage('firstname field is empty.')
                .isLength({ min: 3, max: 32 })
                .withMessage('firstname must be greater than 2 and less than 32 characters.')
                .isAlpha('en-US', {ignore: ' '})
                .withMessage('firstname must contain only letters.');
const lastname = body('lastname')
                .not().isEmpty()
                .withMessage('lastname field is empty.')
                .isLength({ min: 3, max: 32 })
                .withMessage('lastname must be greater than 2 and less than 32 characters.')
                .isAlpha('en-US', {ignore: ' '})
                .withMessage('lastname must contain only letters.');
const username = body('username')
                .optional()
                .not().isEmpty()
                .withMessage('username field is empty.')
                .isLength({ min: 3, max: 32 })
                .withMessage('username must be greater than 2 and less than 32 characters.')
                .isAlphanumeric()
                .withMessage('username must contain only letters and numbers.');
const email = body('email')
                .not().isEmpty()
                .withMessage('email field is empty.')
                .isEmail()
                .withMessage('wrong email format.');
const password = body('password')
                .not().isEmpty()
                .withMessage('password field is empty.')
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })
                .withMessage('password must be greater than 8. it has to contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.');
const newpassword = body('newpassword')
                .not().isEmpty()
                .withMessage('newpassword field is empty.')
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })
                .withMessage('password must be greater than 8. it has to contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.');
const loginValidation = [email, password];
const registerValidation = [ firstname, lastname, username, email, password ];
const searchValidation = [username];
export {registerValidation, loginValidation, searchValidation}
