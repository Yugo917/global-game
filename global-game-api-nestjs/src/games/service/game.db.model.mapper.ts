import { plainToInstance } from "class-transformer";
import { Game, ThirdPartyIdentifier } from "./game.models";
import { IGameDocument } from "./game.schema";
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

export class DbGameMapper {

    public static mapToEntity(gameDocument: IGameDocument): Game {
        if (isNullOrUndefinedOrEmpty(gameDocument)) {
            throw new Error("gameDocument is required");
        }

        const thirdPartyIdentifiers = gameDocument.thirdPartyIdentifiers.map(identifier =>
            plainToInstance(ThirdPartyIdentifier, {
                id: identifier.id,
                name: identifier.name,
                appStore: identifier.appStore
            })
        );

        return plainToInstance(Game, {
            id: gameDocument.id,
            name: gameDocument.name,
            badgeUri: gameDocument.badgeUri,
            isActive: gameDocument.isActive,
            appStore: gameDocument.appStore,
            thirdPartyIdentifiers: thirdPartyIdentifiers,
            updateDate: gameDocument.updateDate,
            creationDate: gameDocument.creationDate
        });
    }
}
