import {
    Client,
    LocalAuth,
    Message,
    MessageContent,
    MessageSendOptions,
    ClientInfo,
  } from "whatsapp-web.js";

const whatsAppClient = new Client({
    authStrategy: new LocalAuth({}),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
  });

export {whatsAppClient};
