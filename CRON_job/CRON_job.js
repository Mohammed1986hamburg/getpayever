var fs = require('fs');
const cron = require('node-cron');
const https= require('https');
const Axios= require('axios');

const users =async page =>{

        const myUrl=`https://reqres.in/api/users?page=${page}`;
        const response= await Axios({
                    url: myUrl,
                    method: 'GET',
                    responseType: 'stream',
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'User-Agent': 'axios/0.19.0'
                    }
          })
          
          var dictstring = JSON.stringify(response.json);
          fs.appendFile("../usres.json", dictstring);
          console.log('Saved!');
      
}

function CronJob(page) {
    cron.schedule("* * * * *", () => {
        console.log("logs every minute");
        users(page);
        page++;
    })
  }
 

module.exports = CronJob;