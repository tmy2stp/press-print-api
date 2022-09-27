const express = require("express");
const router = express.Router();
const fs = require("fs");
const printerPath = './data/printers.json';
const crypto = require("crypto");

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
                type: e.type,
                properties: e.properties,
                geometry: e.geometry,
                id: e.id
            }
        });
        resp.status(200).send(toSend);
    })
    .post((req, resp) => {
        console.log(req);
        let printerType = "Feature";
        let status = "Online";
        let description = req.body.description;
        let handle = req.body.handle;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let geoType = "Point";
        let id = crypto.randomUUID();
        let allHosts = getAllHosts();
        let newHost = {
            type:printerType,
            properties: {
                Status:status,
                Description:description,
                Handle:handle
            },
            geometry: {
                coordinates: [
                    latitude,
                    longitude
                ],
                type:geoType
            },
            id:id
        };
        console.log(allHosts);
        allHosts.features.push(newHost);
        fs.writeFile(printerPath, JSON.stringify(allHosts), (err) => {
            if (err) {
                console.log(err);
            }
        });
        resp.json(allHosts);
    });

module.exports = router;