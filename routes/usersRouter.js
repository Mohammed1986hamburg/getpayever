const express= require('express');
const usersRouter= express.Router();
const {getJson,deleteImage, getImage}= require('../middleware/userMiddleware');



usersRouter.get('/:userId', getJson);
usersRouter.get('/:userId/avatar', getImage);
usersRouter.delete('/:userId/avatar', deleteImage);


module.exports= usersRouter;
