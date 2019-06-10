var fs = require('fs');
const cron = require('node-cron')

const users = page =>{
    fetch(`https://reqres.in/api/users?page=${page}`)
    .then(response =>{
        var dictstring = JSON.stringify(response);
        fs.appendFile("../usres.json", dictstring);
        console.log('Saved!');
    })
    .catch(error=>console.log(error) ); 
}

function CronJob(page) {
    cron.schedule("* * * * *", () => {
        console.log("logs every minute");
        users(page);
        page++;
    })
  }
 

module.exports = CronJob;