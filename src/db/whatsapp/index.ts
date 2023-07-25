import { Document, model, Schema } from "mongoose";

const COLLECTION_NAME = "users";
const COLLECTION_NAME2 = "messages";

export interface IUserInfo extends Document {
  chatId: string;
  store: string;
}

export interface IMessages extends Document {
  chatId: string;
  message: string;
  fromMe: boolean;
}

const UserInfoSchema = new Schema<IUserInfo>(
  {
    chatId: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const MessagesSchema = new Schema<IMessages>(
  {
    chatId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    fromMe: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

const UserModel = model<IUserInfo>(COLLECTION_NAME, UserInfoSchema);
const MessagesModel = model<IMessages>(COLLECTION_NAME2, MessagesSchema);

export { UserModel, MessagesModel };