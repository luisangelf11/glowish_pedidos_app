import jwt from 'jsonwebtoken'

//generate a json web token using the function sign from the jwt module
export const generateToken= (user)=>
    jwt.sign(user, 'TOKEN_KEY', {expiresIn: '8h'});

//validate the token
export const validateToken = (req, res, next) =>{
    //if there is no token in the request header else validate the token using a query parameter
    const accessToken = req.header['authorization'] || req.query.accessToken;
    if(!accessToken) return res.status(404).json({
        "message": "Access denied"
    });
    //the function verify from the jwt module validate the token
    jwt.verify(accessToken, 'TOKEN_KEY', (err, user)=>{
        if(err) return res.status(404).json({"message": "Access denied, token expired or incorrect"});
        else next();
    });
}    