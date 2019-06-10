const express= require('express');
const app= express();
const morgan= require('morgan');
const usersRouter= require('./routes/usersRouter');
const errorHandler=require('./middleware/errorHandler');

const PORT= process.env.PORT || 3000;


app.listen(PORT, () => console.log(` app listening on port ${PORT}!`));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/user', usersRouter);
app.use(errorHandler);
