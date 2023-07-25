import mongoose, { Document, Model, Schema, model } from "mongoose";
import { Config } from "./domains/config";
import Queue from "bull";
import { Utils } from "./utils";

import { whatsAppClient } from "./whatsapp";

//export interface IMessage {
//
//   chatId: string;
//    bodyMessage: string;
//
//}

type MessageJobType = {
    chatId: string,
    text: string
}

export const messageQueue = new Queue<MessageJobType>('message-queue', { redis: Config.redisUrl });

export const BotSendMessage = {
    async sendMessage(chatId: string, text: string) {
        await Utils.sleep(1000);
        await messageQueue.add({ chatId, text });
    }
};

messageQueue.process(async (job: { id: any; data: { chatId: any; text: any; }; }) => {
    console.log(`Processing job ${job.id}: ${JSON.stringify(job.data)}`);
    const { chatId, text } = job.data;

    try {
        await whatsAppClient.sendMessage(chatId, text);
        console.log(`Message sent to ${chatId}`);
    } catch (error) {
        console.error(`Error sending message to ${chatId}: ${error}`);
    }
})

