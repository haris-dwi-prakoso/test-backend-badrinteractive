# Badr Interactive Backend Developer Test
## Setting Up
Configure the database options in `config.json` inside of the config subfolder in each folder. <br/>
Run `npm install` and `npx sequelize-cli db:migrate` in each folder. <br/>
Start `server.js` in each folder as a separate process. Using PM2 is recommended.

## Application Routes
- User: `http:localhost:3001/api/user`
  - List all: `GET /`
  - Create one: `POST /`
    - Body: `{ name: string }`
  - Get one: `GET /:id`
  - Update one: `PUT /:id`
    - Body: `{ name: string }`
  - Delete one: `DELETE /:id`
- Material: `http:localhost:3002/api/material`
  - List all: `GET /`
  - Create one: `POST /`
    - Body: `{ name: string }`
  - Get one: `GET /:id`
  - Update one: `PUT /:id`
    - Body: `{ name: string }`
  - Delete one: `DELETE /:id`
- Transaction: `http:localhost:3003/api/transaction`
  - List all: `GET /`
  - Create one: `POST /`
    - Body: `{ vendorId: number, customerId: number, materialId: number, transactionDate: date string }`
  - Get one: `GET /:id`
  - Update one: `PUT /:id`
    - Body: `{ vendorId: number, customerId: number, materialId: number, transactionDate: date string }`
  - Delete one: `DELETE /:id`