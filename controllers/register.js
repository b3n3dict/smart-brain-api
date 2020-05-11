const handleRegister = (req,res,db,bcrypt)=>{
     const {name,password,email} = req.body;
     if(!name || !password || !email){
         return res.status(400).json('incorrect form submitton')
     }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then (loginEmail =>{
           return trx('users')
            .returning('*')
            .insert({
             email:loginEmail[0],
             name:name,
             joined:new Date()
        
        }).then(user =>{
            res.json(user[0])
        })
     })
     .then(trx.commit)
     .catch(trx.rollback)
    })
    
    .catch(err => res.status(400).json('Unable to resiter'))
        
    }
   module.exports ={
       handleRegister:handleRegister
   };