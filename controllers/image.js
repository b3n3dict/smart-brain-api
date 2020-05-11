const clarifai =require('clarifai');

const app = new Clarifai.App({
    apiKey: '0d40b63d3a3f4eb9819398acaaa2d7c3'
   });
   const handleApiCall =(req,res)=>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>res.status(400).json('unable to work with api'))
   }
   
   
  
const handleImage=(req,res,db)=>{
    const { id }= req.body; 
  db('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries =>{
      res.json(entries[0])
  })
  .catch(err => res.status(400).json('Unable to get counts or entries'))
}
module.exports ={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}