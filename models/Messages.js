import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    from: {type: String},
    to: {type: [String]},
    body: {type: String},
    read: {type: Boolean, default: false},
    timestamp: {type: Date, default: Date.now}
});

msgSchema.statics.toClients = async function (
    clients
) {
    try {
        const msg = await this.create({
            from: 'system',
            to: clients,
            body: `connection between ${clients.join(', ') } is created.`,
            read: true
        });
        return msg;
    } catch (err) {
        throw err;
    }
}
msgSchema.statics.getMessage = async function (
    _id
    ) {
        try {
            const msg = await this.findOne({
                _id
            });
            return msg;
        } catch (err) {
            throw err;
        }
}
msgSchema.statics.createMsg = async function (
    username,
    friend,
    message
    ) {
        try {
            const msg = await this.create({
                from: username,
                to: [friend],
                body: message,
                read: false
            });
            return msg;
        } catch (err) {
            throw err;
        }
}

msgSchema.statics.readMessage = async function (
    _id
) {
    try {
        const msg = await this.updateOne({
            _id
        }, {
            read: true
        });
        return msg;
    } catch (err) {
        throw err;
    }
}

export default mongoose.model('Messages', msgSchema);