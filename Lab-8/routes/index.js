var palindromeRoute=require('./palindrome')
const path=require('path');
const constructorMethod = (app) =>{
    app.use("/",palindromeRoute);
    app.use("*", (req,res) =>{
        res.redirect('/');
    });
};
module.exports = constructorMethod;