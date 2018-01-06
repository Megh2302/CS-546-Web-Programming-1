const reciperoute = require("./recipes");
const commentroute = require("./comments");
const constructorMethod = (app) => {
    app.use("/recipes", reciperoute);
    app.use("/comments", commentroute);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};
module.exports = constructorMethod;