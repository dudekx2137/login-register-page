const express = require("express");//zaimportowanie expressa do obslugi servera
const mysql = require("mysql");//import mysql
const dotenv = require("dotenv");//import dotenv, przydatne by 'ukryc' wrazliwe dane ez
const path = require("path");
const exp = require("constants");


//konfiguracja sciezki do dotenv
dotenv.config({ path: "./.env" });

const app = express();//start expressa

//inicjowanie polaczenia z baza danych
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_login,
    password: process.env.db_password,
    database: process.env.db
});

//dolaczanie publicznych plikow typu css oraz frontend js
const publicDir = path.join(__dirname, "./public");
//dolaczenie statycznych plikow do serwera
app.use(express.static(publicDir));

app.set("view engine", "hbs");//okreslenie view engine dla js, teraz tworze folder z nazwa views bo tak musi byc ze wzgledu na hbs

//bierze dane z np form
app.use(express.urlencoded({ extended: false }));
//dane z np forma beda w formie jsona
app.use(express.json());


//import routes;
app.use("/", require("./routes/pages"));
//controler prawidlowego hasla
app.use("/auth", require("./routes/auth"));

//nasluchiwanie danego portu
app.listen(2137, () => {
    console.log("Server działa na porcie 2137!");//sprawdzanie czy server dziala
});
//wyswietlenie ewentualnego bledu z polaczeniem z mysql
db.connect((error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Połączenie z MYSQL zakończone sukcesem!");
    }
});