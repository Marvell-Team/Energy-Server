var jwt = require('jsonwebtoken');

exports.authenticate = function (req, res, next){
    let {token} = req.session
    if (token){
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                res.redirect('/login')
            }else{
                next();
            }
        });

    }else{
        res.redirect('/login')
    }
}
exports.authenToken = function (req, res, next){
    const authorizationHeader = req.headers['authorization'];
    //bearer token
    const token=authorizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401)
    if (token){
        jwt.verify(token, process.env.JWT_KEY, function(err, data) {
            if(err) res.sendStatus(403);
            next(); 
        });

    }
}