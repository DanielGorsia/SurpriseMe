const express = require("express");
var router = express.Router();
const axios = require("axios");
const utils = require("../utils/ApiUtils");

router.get("/surprise", async (req, res)=> {
    if(!req.query.name || !req.query.birth_year){
        res.status(400).send("Invalid request");
    }
    let name = req.query.name;
    let birth_year = req.query.birth_year;
    let response = await utils.surpriseMe(name, birth_year);
    res.status(200).send(response);
});

router.get("/stats", (req, res)=> {
    let stats = utils.stats();
    res.status(200).send(stats);
});

module.exports = router;