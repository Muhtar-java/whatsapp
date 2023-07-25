import { MessagesModel } from '../../db/whatsapp';

export type NewMessageType = {
    chatId: string;
    message: string;
    fromMe: boolean;
}

class MessagesData {
    constructor() { }

    static async saveMessage(messageFrom: NewMessageType) {
        const msg = new MessagesModel(messageFrom);
        return await msg.save();
    }

}

export { MessagesData };
