import { Schema, Document } from "mongoose";

export const Playerv1CollectionName = "player-v1";

export const PlayerV1Schema = new Schema({
  playerId: { type: String, required: true },
  avatarUri: { type: String, required: true },
  country: { type: String, required: true },
  isBanned: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
  updateDate: { type: Date, required: true },
  creationDate: { type: Date, required: true }
});

export class PlayerDocument extends Document implements IPlayerDocument {
  playerId: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

export interface IPlayerDocument {
  playerId: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}
