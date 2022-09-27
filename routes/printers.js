const express = require("express");
const router = express.Router();
const fs = require("fs");
const printerPath = './data/printers.json';

function getAllHosts() {
    let rawHostData = fs.readFileSync(printerPath);
    let hostData = JSON.parse(rawHostData);
    return hostData;
}

router.route("/")
.get((req, resp) => {
    const allHosts = getAllHosts();
    let toSend = allHosts.features.map((e) => {
        return {
            type:e.type,
            properties:e.properties,
            geometry:e.geometry,
            id:e.id
        }
    });
    resp.status(200).send(toSend);
});

module.exports = router;