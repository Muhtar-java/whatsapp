import { initDatabase } from '../../db/whatsapp/initDatabase';
import { UserModel, MessagesModel } from '../../db/whatsapp';
import { Client, Message } from "whatsapp-web.js";
import { getRandomFirstMessage } from "./message-constraints";
import { MessagesData } from "../../data/whatsapp";
import {Scenariofind} from '../scenariofind'


initDatabase();

async function isFirstTime(chatId:string){
    const msg = await MessagesModel.find({chatId: chatId});
    let check = msg? true: false;
    return check;
}

async function sendFirstMessage(client:Client, id: string){
    let store = UserModel.findOne({chatId:id});
    client.sendMessage(id, getRandomFirstMessage(store.get('store')));
}

async function handleNewMessage(msg: Message){
    console.log(msg.body);
    console.log(msg.from);
    console.log(msg.fromMe);
    Scenariofind.find(msg.from, msg.body);
    await MessagesData.saveMessage({chatId:msg.from, message:msg.body, fromMe:msg.fromMe});
}

export { sendFirstMessage, handleNewMessage };