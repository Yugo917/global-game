#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the project name
PROJECT_NAME="global-game-api"

# Initialize a new NestJS project with Yarn as the package manager
yarn global add @nestjs/cli
nest new $PROJECT_NAME --package-manager yarn

# Navigate to the project directory
cd $PROJECT_NAME

# Generate a basic module, service, and controller structure
nest generate module players
nest generate service players
nest generate controller players

# Add class-transformer and class-validator for DTO mapping and validation
yarn add class-transformer class-validator

# Create an environment variable file (.env) for configuration
echo "NODE_ENV=development
PORT=3000" > .env

# Create a .gitignore file to ignore unnecessary files and directories
echo "node_modules
dist
*.log
.env
" > .gitignore

# Update tsconfig.json for TypeScript best practices
cat <<EOT > tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOT

# Create a README file for project documentation
cat <<EOT > README.md
# $PROJECT_NAME

This is a NestJS Web API project created with TypeScript. It includes a Players module demonstrating best practices for structuring a scalable and maintainable API.

## Setup

1. Install dependencies:
    \`\`\`bash
    yarn install
    \`\`\`

2. Run the development server:
    \`\`\`bash
    yarn start:dev
    \`\`\`

## Technologies Used

- NestJS
- TypeScript
- class-transformer
- class-validator

## API Structure

- **Players Module**: Basic module demonstrating CRUD operations with a well-structured service and controller.
EOT

# Install all project dependencies
yarn install

# Provide feedback to the user
echo "Project setup is complete!"
echo "To get started, navigate to the $PROJECT_NAME directory and start the server:"
echo "cd $PROJECT_NAME"
echo "yarn start:dev"

# Start the server in development mode
yarn start:dev
