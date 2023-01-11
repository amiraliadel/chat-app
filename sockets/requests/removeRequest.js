import Users from "../../models/Users.js";

export default async (username, requestSender) => {

    try {

        // delete request sender from requests field from request accepter.
        const user = await Users.deleteRequest(username, requestSender);
        
        if (!user) throw err;

        return true;

    } catch (err) {

        console.log(err.message);

        return false;

    }

}