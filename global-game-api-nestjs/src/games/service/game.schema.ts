import { Schema } from "mongoose";

export const GameV1CollectionName = "game-v1";

enum AppStore {
    AppelStore = "AppelStore",
    GooglePlayStore = "GooglePlayStore",
    XiaomiStore = "XiaomiStore",
    PlaystationStore = "PlaystationStore",
    NintendoEShop = "NintendoEShop",
    Steam = "Steam",
    unknown = "unknown"
}

const ThirdPartyIdentifierV1Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    appStore: {
        type: String,
        enum: Object.values(AppStore),
        required: true
    }
});

export const GameV1Schema = new Schema({
    name: { type: String, required: true },
    badgeUri: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    appStore: {
        type: String,
        enum: Object.values(AppStore),
        required: true,
        default: AppStore.unknown
    },
    thirdPartyIdentifiers: {
        type: [ThirdPartyIdentifierV1Schema],
        required: true,
        default: []
    },
    updateDate: { type: Date, required: true },
    creationDate: { type: Date, required: true }
});

export interface IGameDocument {
    id: string;
    name: string;
    badgeUri: string;
    isActive: boolean;
    appStore: AppStore;
    thirdPartyIdentifiers: IThirdPartyIdentifier[];
    updateDate: Date;
    creationDate: Date;
}

export interface IThirdPartyIdentifier {
    id: string;
    name: string;
    appStore: AppStore;
}
