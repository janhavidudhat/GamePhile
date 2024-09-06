Steps:

1. `npm install` in \server and \client
2. `npm start` in \server and \client
3. Update config based on your postgres instance in server\config\config.json
4. `npx sequelize-cli db:migrate` in \server to create db in postgres
5. `npx sequelize-cli db:seed:all` to add some dummy data in postgres


Prerequirements:
1. Install node
2. Install postgres
