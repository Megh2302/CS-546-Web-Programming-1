const users = require("./users");
const constructorMethod = (app) => {
    app.use("/", users);

    app.use("*", (req, res) => {
        res.status(404).json({error:"Route Not Found"});
    });

};
module.exports = constructorMethod;

