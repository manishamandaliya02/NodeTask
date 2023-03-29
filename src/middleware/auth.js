const jwt = require("jsonwebtoken");
const db = require('../model')
const User = db.user;

//auth-guard
async function authGuard(req, res, next) {
    let token = req.header("x-auth-token");

    if (token && token !== "") {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
      User.findById(decoded.id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found User with id " + decoded.id });
          else  next();
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving User with id=" + decoded.id });
        });
    } else {
      return res.status(401).send({
        responseCode: "99",
        responseDescription: "Access denied. No token provided.",
      });
    }
}

exports.authGuard = authGuard;

