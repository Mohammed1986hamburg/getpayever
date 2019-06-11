
const dotenv = require('dotenv').config();
const Path= require('path');
const Axios= require('axios');
var Fs = require('fs');
var base64Img = require('base64-img');
const cameIDs=[];





  
//dwonload Image
async function downloadImage (myUrl,imageName) {  
    const path = Path.resolve(__dirname, '../images', imageName+'.jpg')
    const writer = Fs.createWriteStream(path)
  
    const response = await Axios({
      url: myUrl,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve(response.data))
      writer.on('error', reject)
    })
  }

async function returnUserJson (myUrl) {  
    
    const response = await Axios({
      url: myUrl,
      method: 'GET',
      responseType: 'stream'
    })
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve(response.json))
      writer.on('error', reject)
    })
  } 
  
  


  const getJson =async (req, res, next)=>{
      try {
        const myUrl=`https://reqres.in/api/user/${req.params.userId}`;

        const response = await Axios({
            url: myUrl,
            method: 'GET',
            responseType: 'stream',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'User-Agent': 'axios/0.19.0'
            }
          })
        res.status(200).send(response.data);
      } catch (error) {
        res.status(400).json(error)
      }
    
    
    
}


 const getImage = async (req, res, next)=>{
   
      if(!cameIDs.find(id=>id==req.params.userId))
      {
          try{
            //const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
            const url=`https://reqres.in/api/user/${req.params.userId}/avatar`
              await downloadImage(url,req.params.userId) ;
              
              
              var path='./images/'+req.params.userId+'.jpg'
              const base46= base64Img.base64Sync(path);
              res.status(200).send(base46);
              console.log('with downloadImage');

          }catch(error){
            res.status(400).json(error)
          }
      }
      else{   
        var path='./images/'+req.params.userId+'.jpg'
        const base46= base64Img.base64Sync(path);
        res.status(200).send(base46);
        console.log('without downloadImage');
      }

  cameIDs.push(req.params.userId);
 }
 


 const deleteImage = (req, res, next)=>{

    try{
        var path='./images/'+req.params.userId+'.jpg'
        Fs.unlinkSync(path);
        res.status(200).json('deleted');
    }catch(error){
          res.status(400).json(error);
      } 
  
 }


  module.exports = {getJson, deleteImage, getImage};
