const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model");
require("dotenv").config();
const config  = require('../../config/index.js');
const _ = require("underscore");
const User = db.user;

// Create and Save a new User
exports.signup  = (req, res) => {  
    User.findOne({
        email: req.body.email,
      }).then(data => {
        if(!_.isEmpty(data)){
            return res.status(200).send({
                message:  "Email already exists"
            });
        }else{
            // Create a User
            const user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                mobile: req.body.mobile,        
            });

            // Save User in the database
            user
            .save(user)
            .then(data => {
                res.send({ message: "User was registered successfully!" });
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
                });
            });
        }
      })
      .catch(err => {
        return res.status(500).send({
          message:
            err.message
        });
      });  
    
  };

  exports.login  = (req, res) => {  
    User.findOne({
        email: req.body.email,
      }).then(data => {
       
        if(!data){
            return res.status(404).send({ message: "User Not found." });
        }
        
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        let token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: data._id,
            fname: data.fname,
            email: data.email,
            token: token,
          });
      })
      .catch(err => {
        return res.status(500).send({
          message:
            err.message
        });
      });  
    
  };

  // Find a single Category with an id
exports.userById = (req, res) => {
    let token = req.header("x-auth-token");

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     //q.user = decoded;  
    User.findById(decoded.id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Category with id " + decoded.id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Category with id=" + decoded.id });
      });
  };
  