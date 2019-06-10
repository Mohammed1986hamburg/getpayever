const express= require('express');
const usersRouter= express.Router();
const {getJson,DeleteImage, getImage}= require('../middleware/userMiddleware');


usersRouter.get('/{userId}', getJson);
usersRouter.get('/{userId}/avatar', getImage);
usersRouter.delete('/{userId}/avatar', DeleteImage);


module.exports= usersRouter;
