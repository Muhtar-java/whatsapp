import {
    Client,
    LocalAuth,
    Message,
    MessageContent,
    MessageSendOptions,
    ClientInfo,
    GroupChat
  } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { sendFirstMessage, handleNewMessage, getAllUsers } from "./domains/whatsapp-reply";
import { openAiMain } from "./domains/open-ai-chat";
import {whatsAppClient} from './whatsapp';
import {BotSendMessage} from './send-message-queue';
import { initDatabase } from './db/whatsapp/initDatabase';
import {Utils} from './utils'

function authenticated() {
    console.log(`WHATSAPP CLIENT SUCCESFULLY AUTHENTICATED | ${new Date()}`);
}

function qr(qr: string) {
    qrcode.generate(qr, {
      small: true,
    });
  }

  let counter = 0;
export async function start() {
    
    whatsAppClient.on("qr", qr);

    whatsAppClient.on("authenticated", authenticated);

    //whatsAppClient.on("message", handleNewMessage);
    
    await whatsAppClient.initialize();

    await sendFirstMessage();

    /*
    let i = 0;
      while (i <= 200){
      await whatsAppClient.sendMessage("77084875400@c.us","Salescout.me - идеальный инструмент для тебя! Автоматизация бизнеса с простым и удобным интерфейсом. Это как твой личный помощник, который поможет найти новых клиентов и повысить продажи. Быстро, эффективно, удобно. Попробуй сам!");
      i++;
      }*/

/*
    const userIds = await getAllUsers();
    //const userIds = ["77084875400@c.us","77478859358@c.us"];

    // Get the chats (groups and contacts)
    const chats = await whatsAppClient.getChats() as GroupChat[];
     
    
    // Find the group with a matching title or description
    const matchingGroup = chats.filter((chat) => chat.isGroup);

    for (const cht of matchingGroup){
      console.log('groupId:', cht.id._serialized);

      for(const usr of userIds){
          const isWpExists = await whatsAppClient.isRegisteredUser(usr);
          console.log(isWpExists);
          if(isWpExists){
            try{
              await cht.addParticipants([usr]);
              console.log(`${usr} has been added to the group: ${cht.id._serialized}`);
              await Utils.sleep(1000);
            }
            catch(error){
              console.log(`${usr} not added to group`, error);
              await Utils.sleep(1000);
            }
          }
          
      } 
      await Utils.sleep(1000);
      await cht.sendMessage(await openAiMain.handleUserMessage("Расскажи про ваш сервис"));
      
      await Utils.sleep(2000);
    
    
    // 

    //await BotSendMessage.sendMessage("77084875400@c.us", "message");
    
    }*/
  }
  

start();