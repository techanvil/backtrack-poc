const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Validator, ValidationError } = require('express-json-validator-middleware');

const validator = new Validator({allErrors: true});

const eventMiddleware = (req, res, next) => {
  req.geckoEvent = req.body.event;
  req.geckoSchema = req.body.schema;
  next();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(eventMiddleware);

app.post('/event/', validator.validate({geckoEvent: ({geckoSchema}) => geckoSchema}), function(req, res) {
  res.send('valid');
});

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).send('invalid');
    next();
  }
  else next(err);
});

app.listen(8000);
