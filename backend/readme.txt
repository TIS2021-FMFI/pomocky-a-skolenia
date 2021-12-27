createscript.txt obsahuje create tabudliek do postgresql databazy.
generate.txt obsahuje testovacie hodnoty pre oblasti a zamestnancov

v subore server.js treba prepisať
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gefcotest',
    password: 'Data11',
    dialect: 'postgres',
    port: 5432
});

na vašu localhost databázu.

npm install
-nainštaluje potrebné package

node server.js
-pusti server na http://localhost:9000/

