db = db.getSiblingDB('global-game');

db.createCollection('player-v1', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'playerId',
        'name',
        'email',
        'thirdPartyIdentifiers',
        'avatarUri',
        'country',
        'isBanned',
        'isActive',
        'updateDate',
        'creationDate'
      ],
      properties: {
        playerId: {
          bsonType: 'string',
          description: 'ID must be a string in UUID format and is required',
          pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
        },
        name: {
          bsonType: 'string',
          description: 'Name must be a string and is required',
        },
        email: {
          bsonType: 'string',
          description: 'Email must be a valid email format and is required',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        avatarUri: {
          bsonType: 'string',
          description: 'Avatar URI must be a string and is required',
        },
        avatarName: {
          bsonType: 'string',
          description: 'Avatar name (e.g., zebra, rabbit)',
          enum: ["zebra", "rabbit", "rhino", "buffalo", "crocodile"
            , "seal", "pig", "hippo", "giraffe", "ostrich"
            , "walrus", "penguin", "bear", "snake", "chicken"
            , "gecko", "macaw", "horse", "elephant", "duck"
            , "sloth", "panda", "blue_hippo", "eagle", "moose"
            , "gray_rhino", "owl", "gorilla", "koala", "camel"],
        },
        country: {
          bsonType: 'string',
          description: 'Country must be a 2-letter ISO code and is required',
          pattern: '^[A-Z]{2}$',
        },
        thirdPartyIdentifiers: {
          bsonType: 'array',
          description: 'List of third-party identifiers associated with the player',
          items: {
            bsonType: 'object',
            required: ['id', 'name', 'email', 'avatarUri', 'gameServiceProvider'],
            properties: {
              id: {
                bsonType: 'string',
                description: 'ID of the third-party identifier (required)',
              },
              name: {
                bsonType: 'string',
                description: 'Name of the third-party identifier (required)',
              },
              email: {
                bsonType: 'string',
                description: 'Email associated with the third-party identifier',
                pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              },
              avatarUri: {
                bsonType: 'string',
                description: 'Avatar URI of the third-party identifier',
              },
              gameServiceProvider: {
                bsonType: 'string',
                description: 'Game service provider (e.g., GoogleGames, GameCenter)',
                enum: ['Unknown', 'GoogleGames', 'GameCenter'],
              },
            },
          },
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
    name: 'Full John Doe',
    email: 'full.john.doe@example.com',
    avatarUri: 'https://example.com/avatar1.png',
    avatarName: 'crocodile',
    country: 'US',
    thirdPartyIdentifiers: [
      {
        id: 'tpid-12345',
        name: 'Google Account',
        email: 'john.doe1@gmail.com',
        avatarUri: 'https://example.com/google-avatar.png',
        gameServiceProvider: 'GoogleGames',
      },
      {
        id: 'tpid-123456',
        name: 'Apple Game Center',
        email: 'john.doe2@gmail.com',
        avatarUri: 'https://example.com/apple-avatar.png',
        gameServiceProvider: 'GameCenter',
      }
    ],
    isBanned: false,
    isActive: true,
    updateDate: new Date(),
    creationDate: new Date(),
  },
  {
    playerId: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarUri: 'https://example.com/avatar2.png',
    avatarName: 'snake',
    country: 'CA',
    thirdPartyIdentifiers: [
      {
        id: 'tpid-67890',
        name: 'Apple Game Center',
        email: 'jane.smith@icloud.com',
        avatarUri: 'https://example.com/apple-avatar.png',
        gameServiceProvider: 'GameCenter',
      },
    ],
    isBanned: false,
    isActive: true,
    updateDate: new Date(),
    creationDate: new Date(),
  },
  {
    playerId: 'c56a4180-65aa-42ec-a945-5fd21dec0599',
    name: 'Jane Smith 2',
    email: 'jane.smith2@example.com',
    avatarUri: 'https://example.com/avatar2.png',
    avatarName: 'snake',
    country: 'US',
    thirdPartyIdentifiers: [
      {
        id: 'tpid-678999',
        name: 'Apple Game Center',
        email: 'jane.smith2@icloud.com',
        avatarUri: 'https://example.com/apple-avatar.png',
        gameServiceProvider: 'GameCenter',
      },
    ],
    isBanned: false,
    isActive: true,
    updateDate: new Date(),
    creationDate: new Date(),
  },
]);

db.getCollection('game-v1').insertMany([
  {
    id: '7a1f3c0a-3b7f-4c3f-a8e5-1a2b3c4d5e6f',
    name: 'Fifa 2025',
    badgeUri: 'https://example.com/fifa-2025.png',
    isActive: true,
    appStore: 'Steam',
    thirdPartyIdentifiers: [
      {
        id: 'steam-123',
        name: 'Steam Store',
        appStore: 'Steam'
      },
      {
        id: 'ps-456',
        name: 'Playstation Store',
        appStore: 'PlaystationStore'
      }
    ],
    updateDate: new Date(),
    creationDate: new Date()
  },
  {
    id: 'b2d2f5e7-4a8b-4b7c-9c71-8c9e0d4b7e2f',
    name: 'Call of Duty Mobile',
    badgeUri: 'https://example.com/cod-mobile.png',
    isActive: true,
    appStore: 'GooglePlayStore',
    thirdPartyIdentifiers: [
      {
        id: 'gp-789',
        name: 'Google Play Store',
        appStore: 'GooglePlayStore'
      },
      {
        id: 'as-321',
        name: 'Apple Store',
        appStore: 'AppelStore'
      }
    ],
    updateDate: new Date(),
    creationDate: new Date()
  },
  {
    id: 'd8f7b6c5-9c8a-4d6e-8b9a-7f6e5d4c3b2a',
    name: 'Zelda Breath of the Wild',
    badgeUri: 'https://example.com/zelda.png',
    isActive: true,
    appStore: 'NintendoEShop',
    thirdPartyIdentifiers: [
      {
        id: 'nes-987',
        name: 'Nintendo eShop',
        appStore: 'NintendoEShop'
      }
    ],
    updateDate: new Date(),
    creationDate: new Date()
  }
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

