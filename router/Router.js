const express = require('express');
const message = require('../controller/Controller');
const Router = express.Router();

Router.post('/get',message.GetBotMessage);
Router.post('/create',message.CreateMessage);
Router.post('/well',message.wellMessage);


module.exports = Router;