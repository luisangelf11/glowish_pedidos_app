import bcrypt from 'bcrypt'

export const encryptPass = async (password) => {
    try {
        //Generate the salt for encryp
        const salt = await bcrypt.genSalt(10);
        //Create the hash
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        console.log(err.message)
    }
}

export const comparePass = async (password, hash) =>{
    try{
      //The hash is the password that is save in the DB
      //Password is the params that is send for the user 
      const compare = await bcrypt.compare(password, hash); //This return true or false
      return compare;
    }
    catch(err){
        console.log(err.message)
    }
}
    


