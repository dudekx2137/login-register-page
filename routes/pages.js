const express = require("express");

const router = express.Router();

// render strony index
router.get("/login", (req, res) =>{
    res.render("login")
});
router.get("/", (req, res) =>{
    res.render("login")
});
// render strony main
router.get("/main", (req, res) =>{
    res.render("main")
});


module.exports = router; //eksportuje routersyxd
