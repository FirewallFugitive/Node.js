# Node.js
# Backend Web - Laravel Project
Dit project is een Node-js webapplicatie waarmee gebruikers kunnen zoeken voor bepaalde films, 

![VScode](https://img.shields.io/badge/VScode-v1.96.2-blue?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=000000)
![Node.js](https://img.shields.io/badge/Node.js-v20.18.1-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=000000)
![MySQL](https://img.shields.io/badge/MySQL-v8.0.40-yellow?style=for-the-badge&logo=MySQL&logoColor=white&labelColor=000000)

## Inhoudsopgave

1. [Functionaliteiten](#functionaliteiten)
2. [Installatie](#installatie)
3. [Starten van de applicatie](#starten-van-de-applicatie)


## Functionaliteiten

- CRUD van films + limit & offset op deze page
- Films zoeken adhv zoekterm + sorteren
- CRUD reviews
-  

## Installatie

1. **Kloon de repository:**

   ```bash
   git clone https://github.com/FirewallFugitive/Node.js.git
   ```

2. **Installeer afhankelijkheden:**

  - Installeer node js van deze links: https://nodejs.org/
  - Install npm & express
   ```bash
   npm install
   npm install express
   ```

3. **Stel de database in:**
   - Maak een MySQL-database lokaal aan
   - Update de `.env` file met je databasegegevens:
    ```bash
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=password
      DB_NAME=film_reviews
      DB_PORT=3306
    ```

## Starten van de applicatie

   ```bash
   node server.js
   ```
