import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['admin', 'user'], default: 'user'},
    contacts: [{
        username: {type: String},
        chatId: {type: mongoose.ObjectId}
    }],
    requests: [{
        firstname: {type: String},
        lastname: {type: String},
        username: {type: String},
        userId: mongoose.ObjectId
    }],
    joindAt: {type: Date, default: Date.now}
});

// create user.
userSchema.statics.createUser = async function (
    firstname,
    lastname,
    username,
    email,
    password,
    role,
    contacts,
    requests
) {
    try {
        const user = await this.create({
            firstname,
            lastname,
            username,
            email,
            password,
            role,
            contacts,
            requests
        });
        return user;
    } catch (err) {
        throw err;
    }
}

// check if email or username is already used.
userSchema.statics.isExist = async function (
    username,
    email
) {
    try {
        const user = await this.findOne({
            $or: [{username}, {email}]
        }).select('username email');
        return user;
    } catch (err) {
        throw err;
    }
}

// find user by email.
userSchema.statics.findUserByEmail = async function (
    email
) {
    try {
        const user = await this.findOne({
            email
        })
        .select('password username');
        if (!user) throw new Error('no such email exists.');
        return user;
    } catch (err) {
        throw err;
    }
}

// get user data.
userSchema.statics.userData = async function (
    username
) {
    try {
        const user = await this.findOne({
            username
        })
        .select('firstname lastname username email role contacts requests chats');
        if (!user) throw new Error('no such user exists.');
        return user;
    } catch (err) {
        throw err;
    }
}

// query user
userSchema.statics.searchUser = async function (
    username
) {
    try {
        const user = await this.findOne({
            username
        })
        .select('firstname lastname username');
        if (!user) throw new Error('no such user exists.');
        return user;
    } catch (err) {
        throw err;
    }
}

// return contacts list
userSchema.statics.contacts = async function (
    username
) {
    try {
        const user = await this.findOne({
            username
        })
        .select('firstname lastname contacts');
        if (!user) throw new Error('no such user exists.');
        return user;
    } catch (err) {
        throw err;
    }
}

// return requests list
userSchema.statics.requests = async function (
    username
) {
    try {
        const user = await this.findOne({
            username
        })
        .select('requests');
        if (!user) throw new Error('no such user exists.');
        return user;
    } catch (err) {
        throw err;
    }
}

// add request to the requests list
userSchema.statics.addRequest = async function (
    username,
    firstname,
    lastname,
    requestsender,
    requestsenderId
    ) {
        try {
            const update = await this.updateOne({
                username
            }, 
            {
                $push: {
                    requests: {
                        firstname: firstname,
                        lastname: lastname,
                        username: requestsender,
                        userId: requestsenderId
                    }
                }
            });
            if (!update) throw new Error('could not add request to the requests field.');
            return update;
        } catch (err) {
            throw err;
        }
}
// delette request
userSchema.statics.deleteRequest = async function (
    username,
    requestsender
    ) {
        try {
            const update = await this.updateOne({
                username
            }, 
            {
                $pull: {
                    requests: {
                        username: requestsender
                    }
                }
            });
            if (!update) throw new Error('could not delete request from the requests field.');

            const requests = await this.findOne({
                username
            })
            .select('requests');
            return requests;
        } catch (err) {
            throw err;
        }
}

// add contact
userSchema.statics.addContact = async function (
    username,
    username2,
    chatId
    ) {
        try {
            const update = await this.updateOne({
                username
            }, 
            {
                $push: {
                    contacts: {
                        username: username2,
                        chatId
                    }
                }
            });
            if (!update) throw new Error('could not add contact to the contacts field.');
            return update;
        } catch (err) {
            throw err;
        }
}

// get chat id
userSchema.statics.chatId = async function (
    username,
    _contact
    ) {
        try {
            const user = await this.findOne({
                username
            })
            .select('contacts');
            if (!user) throw new Error('no such user exists.');
            let chatId = null;
            user.contacts.map(contact => {
                if (contact.username === _contact) {
                    chatId = contact.chatId;
                }
            });
            return chatId;
        } catch (err) {
            throw err;
        }
}
export default mongoose.model('Users', userSchema);