import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    owners: {type: [String]},
    messages: [
        {
            messageId: {type: mongoose.ObjectId},
        }
    ] ,
    timestamp: {type: Date, default: Date.now}
});

chatSchema.statics.initChat = async function (
    owners,
    messageId
) {
    try {
        const chat = await this.create({
            owners,
            messages: [
                {messageId: messageId}
            ]
        });
        return chat;
    } catch (err) {
        throw err;
    }
}
chatSchema.statics.messages = async function (
    _id
    ) {
    try {
        const chat = await this.findOne({
            _id
        }).select('messages');
        return chat.messages;
    } catch (err) {
        throw err;
    }
}
chatSchema.statics.addMsgId = async function (
    _id,
    messageId
    ) {
        try {
            const update = this.updateOne({
                _id
            }, 
            {
                $push: {
                    messages: {
                        messageId: messageId
                    }
                }
            });
            if (!update) throw new Error('could not add request to the requests field.');
            return update;
        } catch (err) {
            throw err;
        }
}

export default mongoose.model('Chats', chatSchema);