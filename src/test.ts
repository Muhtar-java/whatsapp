import {
    Client,
    LocalAuth,
    Message,
    MessageContent,
    MessageSendOptions,
    ClientInfo,
  } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { sendFirstMessage, handleNewMessage } from "./domains/whatsapp-reply";
import {whatsAppClient} from './whatsapp';
import {BotSendMessage} from './send-message-queue';


function authenticated() {
    console.log(`WHATSAPP CLIENT SUCCESFULLY AUTHENTICATED | ${new Date()}`);
}

function qr(qr: string) {
    qrcode.generate(qr, {
      small: true,
    });
  }

export async function start() {

    whatsAppClient.on("qr", qr);

    whatsAppClient.on("authenticated", authenticated);

    whatsAppClient.on("message", handleNewMessage);

    await whatsAppClient.initialize();

    await sendFirstMessage(whatsAppClient, "77084875400@c.us");

    //await BotSendMessage.sendMessage("77084875400@c.us", "message");
    
    
}

start();