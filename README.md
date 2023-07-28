# product_catalog_backendz

commands:
`npm run dev`
Runs the application in development mode. This command uses nodemon to automatically restart the project's build when files with the .ts extension change. The NODE_ENV variable is set to development to indicate the development mode.

`npm start`
Starts the application in production mode. It first runs the npm run build command to build the project using swc, and then sets the NODE_ENV=production variable to configure the application's behavior for production mode.