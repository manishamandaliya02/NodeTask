const express = require('express');
const routes = require('./src/routes/index');
const { config } = require('./config/index');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require("./src/model");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(`/api`, routes);

const PORT = config.PORT;
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));

process.on('uncaughtException', function (err) {
    console.error("Uncaught exception occurred, Node NOT Exiting...", err.stack);
});
