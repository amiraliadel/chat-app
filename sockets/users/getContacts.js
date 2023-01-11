import Users from "../../models/Users.js"

export default async (username) => {

    try {
        // get the contacts array from client user document.
        const user = await Users.contacts(username);
        const contacts = user.contacts;
        return contacts;
    } catch (err) {
        throw err;
    }
}