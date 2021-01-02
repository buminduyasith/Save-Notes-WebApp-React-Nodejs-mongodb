const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const api_notes = require('./api/notes')
const rateLimit = require("express-rate-limit");
const {checkTokenSetUser , isLogin} = require('./auth/middleware');
require('dotenv').config();

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});


app.use(cors('*'));
app.use(express.json()); 
app.use("/auth/", apiLimiter);

app.use(checkTokenSetUser);

app.get('/', (req, res) => {



  res.json({
   
    user:req.user
  });
});

app.use('/auth',auth);
//app.use('/api/v1/notes',isLogin,api_notes);

//testing 

app.use('/api/v1/notes',api_notes);




function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = 8081;
app.listen(port, () => {
  console.log('Listening on port', port);
});