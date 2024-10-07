db = db.getSiblingDB('global-game');

db.createCollection('player-v1', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['playerId', 'avatarUri', 'country', 'isBanned', 'isActive', 'updateDate', 'creationDate'],
      properties: {
        playerId: {
          bsonType: 'string',
          description: 'ID must be a string in UUID format and is required',
          pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
        },
        avatarUri: {
          bsonType: 'string',
          description: 'Avatar URI must be a string and is required',
        },
        country: {
          bsonType: 'string',
          description: 'Country must be a string and is required',
        },
        isBanned: {
          bsonType: 'bool',
          description: 'isBanned must be a boolean and is required',
        },
        isActive: {
          bsonType: 'bool',
          description: 'isActive must be a boolean and is required',
        },
        updateDate: {
          bsonType: 'date',
          description: 'updateDate must be a date and is required',
        },
        creationDate: {
          bsonType: 'date',
          description: 'creationDate must be a date and is required',
        },
      },
    },
  },
});

db.getCollection('player-v1').insertMany([
  {
    playerId: 'd41d8cd9-8f00-3204-a980-001f60c5ed5f',
    avatarUri: 'https://example.com/avatar1.png',
    country: 'USA',
    isBanned: false,
    isActive: true,
    updateDate: new Date(),
    creationDate: new Date(),
  },
  {
    playerId: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    avatarUri: 'https://example.com/avatar2.png',
    country: 'Canada',
    isBanned: false,
    isActive: true,
    updateDate: new Date(),
    creationDate: new Date(),
  },
]);

db.createUser({
  user: "gg-user",
  pwd: "gg-password",
  roles: [
      {
          role: "readWrite",
          db: "global-game"
      }
  ]
});
