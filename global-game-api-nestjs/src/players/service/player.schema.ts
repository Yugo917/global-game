import { Schema, Document } from "mongoose";

export const Playerv1CollectionName = "player-v1";

const ThirdPartyIdentifierV1Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  avatarUri: { type: String, required: true },
  gameServiceProvider: {
    type: String,
    required: true,
    enum: ["Unknown", "GoogleGames", "GameCenter"]
  }
});

export const PlayerV1Schema = new Schema({
  playerId: {
    type: String,
    required: true,
    match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  avatarUri: { type: String, required: true },
  country: {
    type: String,
    required: true,
    match: /^[A-Z]{2}$/
  },
  thirdPartyIdentifiers: {
    type: [ThirdPartyIdentifierV1Schema],
    required: true
  },
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
  public thirdPartyIdentifiers: IThirdPartyIdentifier[] = [];
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
  thirdPartyIdentifiers: IThirdPartyIdentifier[],
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

export interface IThirdPartyIdentifier {
  id: string;
  name: string;
  email: string;
  avatarUri: string;
  gameServiceProvider: "Unknown" | "GoogleGames" | "GameCenter";
}
