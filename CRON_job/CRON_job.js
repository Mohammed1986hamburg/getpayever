var fs = require('fs');

const users = page =>{
    fetch(`https://reqres.in/api/users?page=${page}`)
    .then(response =>{
        var dictstring = JSON.stringify(response);
        fs.appendFile("usres.json", dictstring);
        console.log('Saved!');
    })
    .catch(error=>console.log(error) ); 
}

function CronJob(page) {
    setTimeout(function(){
    users(page)
    page++
    }, 60000);
  }
 

module.exports = CronJob;