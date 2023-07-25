import {BotSendMessage} from "../../send-message-queue";
import { handleUserMessage } from "../open-ai-chat"

export class Scenariofind {
    static find(chatId: string, textUser: string) {
        const textUserOldVer = textUser;

        // Удаляем все символы и знаки препинания, оставляя только буквы и пробелы
        const cleanedText = textUser.replace(/[^\p{L}\s]/gu, '');

        // Добавляем пробелы между словами
        const spacedText = cleanedText.replace(/\s+/g, ' ').trim();

        // Приводим сообщение пользователя к нижнему регистру
        const lowerCaseText = spacedText.toLowerCase();

        // Используем регулярные выражения для поиска слов "да" и "нет"
        const regexYes = /да/i;
        const regexNo = /нет/i;

        // Проверяем, содержит ли сообщение слово "да" или "нет"
        const containsYes = regexYes.test(lowerCaseText);
        const containsNo = regexNo.test(lowerCaseText);
        console.log(chatId);
        console.log(textUser);
        console.log(containsYes);
        console.log(containsNo);
        // Возвращаем результаты поиска
        switch (true) {
            case containsYes:
                this.handleYes(chatId, textUserOldVer);
                break;
            case containsNo:
                this.handleNo(chatId, textUserOldVer);
                break;
            default:
                this.handleOther(chatId, textUserOldVer);
                break;
        }
    }

    static async handleYes(chatId: string, textUser: string) {
        const chatResponse = await handleUserMessage(textUser);
        BotSendMessage.sendMessage(chatId, chatResponse);
    }

    static handleNo(chatId: string, textUser: string) {
        const chatResponse = "Извиняюсь, пока";
        BotSendMessage.sendMessage(chatId, chatResponse);
    }

    static handleOther(chatId: string, textUser: string) {
        const chatResponse = "Окей, пока";
        BotSendMessage.sendMessage(chatId, chatResponse);
    }
}
