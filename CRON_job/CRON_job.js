var fs = require('fs');
const cron = require('node-cron')

const users =async page =>{
    try {
        const myUrl=`https://reqres.in/api/users?page=${page}`;
        const response = await Axios({
                    url: myUrl,
                    method: 'GET',
                    responseType: 'stream',
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'User-Agent': 'axios/0.19.0'
                    }
          })
        var dictstring = JSON.stringify(response.data);
        fs.appendFile("../usres.json", dictstring);
        console.log('Saved!');
      } catch (error) {
        console.log(error);
      }
}

function CronJob(page) {
    cron.schedule("* * * * *", () => {
        console.log("logs every minute");
        users(page);
        page++;
    })
  }
 

module.exports = CronJob;