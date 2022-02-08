# Pracovné pomôcky a školenia (GEFCO)

Backend

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Enter your database and email in `config.json` like :
   ```JSON
   {
   "DATABASE": {
    "USER": "yourDBusername",
    "HOST": "yourDBhost",
    "DATABASE": "yourDBname",
    "PASSWORD": "yourDBpassword",
    "DIALECT": "postgres",
    "PORT": 5432
   },
    "API_PORT": 9000,
    "SECRET.KEY": "secretFORpassword",
    "MAILER": {
      "EMAIL": "emailFORnotifications",
      "HESLO": "yourEMAILpassword",
      "SERVICE": "gmail"
   }
   ```
3. Create databese with `createScript.sql`

4. Create admin account
    ```sh
       npm run admin "HESLO"
    ```

4. Run project
    ```sh
       npm run start
    ```
