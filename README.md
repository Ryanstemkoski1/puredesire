# Pure Desire Web App

Project was started by following the [MERN Auth Template Tutorial YouTube Series by Devistry](https://www.youtube.com/playlist?list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU).

## Local Deployment
1. Add environment variables to both the server folder and the client folder.
   1. Server env file should contain the following variables.
      - MDB_CONNECT
      - JWT_SECRET
      - PORT
      - SERVER_URL
      - CLIENT_URL
   2. Client env file should contain the following variables.
      - REACT_APP_API_URL
2. You will need to run `npm install` from both the server folder and the client folder.
3. To start the server use `npm run dev`.
4. To start the front end use `npm run clientStart` from inside the client folder. (This will keep you from having to run a new build everytime you make a change)

## Staging Deployment on Plesk
1. Pull in the changes using the Git Dev Tool in the API project.
2. In the Node.js Dev Tool of the API project folder, click the `NPM install` button.
3. After the installation is done click the `Restart App` button for good measure.
4. Switch to the App project in Plesk.
5. In the Node.js Dev Tool of the APP project folder, click the `NPM install` button.
6. After the installation is done click the `Run script` button and run the `clientBuild` command.
7. We need to be sure that .htaccess file exists and the content looks like:
   
   `<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteBase /subdirectory
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-l
   RewriteRule . /index.html [L]
   </IfModule>`

### Add-Ons & Third Party Accounts In Use
- [AWS Cognito](https://github.com/markpking2/aws-cognito-node-react#step-one)
- Google Console
- [Translation Library](https://betterprogramming.pub/add-multi-language-support-in-react-js-a771c9ab31c3)