const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
//inicjowanie polaczenia z baza danych
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_login,
    password: process.env.db_password,
    database: process.env.db
});
// sprawdza posta ze strony login
router.post("/login", exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT email, password FROM pracownicy WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length === 0) {
            return res.render("login", {
                message: "Wprowadziłeś złe dane!"
            });
        } else {
            const user = results[0];
            if (user.password === password) {
                return res.render("main");
            } else {
                return res.render("login", {
                    message: "Wprowadziłeś złe hasło!"
                });
            }
        }
    });
    console.log(req.body);
});

//sprawdza posta(register form) z main strony(byc moze do zmiany)(opcja dla administratora, ktory bedzie mogl dodac uzytkownika)
router.post("/main", exports.main = (req, res) =>{
    const {name, surrname, email, password, passwordRepeat, accountType} = req.body;
    //sprawdza czy mail jest w bazie
    db.query("SELECT email FROM pracownicy WHERE email = ?", [email], (error, results) =>{
        if(error){
            console.log(error);
        };
        if(results.length > 0){
            return res.render("main", {
                message: "Podany email jest zajęty"
            });
        }else if(password != passwordRepeat){
            return res.render("main", {
                message: "Podane hasła muszą być takie same"
            });
        }else if(name == "" || surrname == "" || email == "" || passsword == ""){
            return res.render("main", {
                message: "Proszę uzupełnić wszystkie pola!"
            });
        };
        db.query("INSERT INTO pracownicy SET ?", {name: name, surrname: surrname, email: email, password: password, accountType: accountType}, (error, results) =>{
            if(error){
                console.log(error);
            }else{
                return res.render("main", { 
                    message: "Użytkownik został dodany!"
                });
            };
        });
    });
    console.log(req.body);
   
    
});

//sprawdza posta z main strony(opcja dla nauczyciela, ktory bedzie chcial dodac ucznia(ta opcja na pozniej))
module.exports = router; //eksportuje routersyxd
