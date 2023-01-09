import Users from '../../models/Users.js';

export default async (req, res) => {
    // assign username. the req.username comes from /middleware/decodeJwtToken.js
    const username = req.username;
    
    try {
        // check if there is any username.
        if (!username) throw new Error('username is undefined.');
        // get user data
        const user = await Users.userData(username);
        //console.log(user);
        // return user data.
        return res.status(200).json({user: user, success: true});
    } catch (err) {
        // return err message.
        return res.status(401).json({server_message: err.message});
    }
}