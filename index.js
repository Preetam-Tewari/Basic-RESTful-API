'use strict';
const hostname = 'localhost';
const port = 3000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let contacts = require("./data");


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.get("/api/contacts", function(req, res){
    if(!contacts){
        res.status(404).json({message: "No contacts found"});
    }
    res.json(contacts);
});

app.get("/api/contacts/:id", function(req, res){
    const reqId = req.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == reqId;
    });
    if(!contact){
        res.status(404).json({message: "No contact found"});
    }
    res.json(contact[0]);
});

app.post("/api/contacts", function(req, res){
    const contact = {
        id: contacts.length +1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        website: req.body.website
    };

    contacts.push(contact);
    res.json(contact);
});

app.put("/api/contacts/:id", function(req, res){
    const reqId = req.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == reqId;
    })[0];

    const index = contacts.indexOf(contact);
    const keys = Object.keys(req.body);
    keys.forEach(key =>{
        contact[key] = req.body[key];
    });

    contacts[index]= contact;
    res.json(contacts[index]);
});

app.listen(port, hostname, () => {
    console.log('Server is running');
});