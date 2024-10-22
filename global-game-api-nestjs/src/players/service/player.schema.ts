import { Schema, Document } from "mongoose";

export const Playerv1CollectionName = "player-v1";

export const PlayerV1Schema = new Schema({
  playerId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUri: { type: String, required: true },
  country: { type: String, required: true },
  isBanned: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
  updateDate: { type: Date, required: true },
  creationDate: { type: Date, required: true }
});

export class PlayerDocument extends Document implements IPlayerDocument {
  public playerId: string = "";
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public country: string = "";
  public isBanned: boolean = false;
  public isActive: boolean = false;
  public updateDate: Date = new Date();
  public creationDate: Date = new Date();
}

export interface IPlayerDocument {
  playerId: string;
  name: string;
  email: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}
