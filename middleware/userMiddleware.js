
const dotenv = require('dotenv').config();
const Path= require('path');
const Axios= require('axios');
var Fs = require('fs');
var base64Img = require('base64-img');
const cameIDs=[];
const https= require('https');





  
//dwonload Image
async function downloadImage (myUrl,imageName) {  
    const path = Path.resolve(__dirname, '../images', imageName+'.jpg')
    const writer = Fs.createWriteStream(path)
  
    const response = await Axios({
      url: myUrl,
      method: 'GET',
      responseType: 'stream',
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })
  
    response.data.pipe(writer)
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve(response.json))
      writer.on('error', reject)
    })
  }


  
  


  const getJson =async (req, res, next)=>{
      
        const myUrl=`https://reqres.in/api/users/${req.params.userId}`;

        await Axios({
          url: myUrl,
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
          },
          responseType: 'json',
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
          })
          .then(dataj => dataj.json)
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error => {
            next(error);
          })
          
        
    
    
    
}


 const getImage = async (req, res, next)=>{
   
      if(!cameIDs.find(id=>id==req.params.userId))
      {
          try{
            const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
            //const url=`https://reqres.in/api/user/${req.params.userId}/avatar`
              
             await downloadImage(url,req.params.userId) ;
              
              
              var path='./images/'+req.params.userId+'.jpg'
              const base46= base64Img.base64Sync(path);
              res.status(200).send(base46);
              console.log('with downloadImage');

          }catch(error){
            next(error);
          }
          cameIDs.push(req.params.userId);
          console.log(cameIDs);
      }
      else{   
        var path='./images/'+req.params.userId+'.jpg'
        const base46= base64Img.base64Sync(path);
        res.status(200).send(base46);
        console.log('without downloadImage');
      }

  

 }
 


 const deleteImage = (req, res, next)=>{

    try{
        var path='./images/'+req.params.userId+'.jpg'
        Fs.unlinkSync(path);

        var index = cameIDs.indexOf(req.params.userId);
  
      if (index > -1) {
        cameIDs.splice(index, 1);
      };
      console.log(cameIDs);

        res.status(200).json('deleted');
    }catch(error){
          res.status(400).json(error);
      } 
  
 }


  module.exports = {getJson, deleteImage, getImage};
