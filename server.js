const express= require('express');
const app= express();
const morgan= require('morgan');
const usersRouter= require('./routes/usersRouter');
const errorHandler=require('./middleware/errorHandler');
const CronJob=require('./CRON_job/CRON_job')


const PORT= process.env.PORT || 3000;


app.listen(PORT, () => console.log(` app listening on port ${PORT}!`));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


CronJob(1);

app.use('/api/user', usersRouter);
app.use(errorHandler);
