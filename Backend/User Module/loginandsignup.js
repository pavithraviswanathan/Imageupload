const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 15;

const url = 'mongodb://localhost:27017/UserImages';

var usermodule = {

    signup: async function (req, res) {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db("UserImages");
            console.log('Connected to MongoDB successfully!');

            //using bcrypt the password is hashed
            let password = await bcrypt.hash(req.body.password,saltRounds)
            let userjson = {
                "systemid": uuidv4(),
                "username": req.body.username,
                "emailid": req.body.emailid,
                "password": password
            };

            const result = await db.collection("users").insertOne(userjson);
            console.log("Inserted successfully");

            // MongoDB connection closed
            client.close();

            res.status(200).send({ success: true, message: "User Added Successfully" });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send({ isSuccess: false, statuscode: 500, message: "Internal Server Error" });
        }
    },
    login: async function (req, res) {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db("UserImages");
            console.log('Connected to MongoDB successfully!');
           
            const result = await db.collection("users").findOne({"emailid": req.body.emailid});
            console.log(result)
            //using compare, the entered password is compared with the hash stored already in db
            bcrypt.compare(req.body.password, result.password, function(err, result) {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return;
                }
                if (result === true) {
                    console.log("Password matched Login success");
                    res.send({ success: true, message: "User Login Success" });

                } else {
                    res.send({ success: false, message: "Incorrect Password" });
                }
            });
            // MongoDB connection closed
            client.close();

        } catch (err) {
            console.error("Error:", err);
            res.status(500).send({ isSuccess: false, statuscode: 500, message: "Internal Server Error" });
        }
    }

};

module.exports = usermodule