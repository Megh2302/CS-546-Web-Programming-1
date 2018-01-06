const about = require("./about");
const education = require("./education");
const story = require("./story");

const constructorMethod = (app) => {
    app.use("/about", about);
    app.use("/education", education);
    app.use("/story", story);

    app.use("*", (req, res) =>
    {
        res.sendStatus(404).json({error: "Not found"});
    });
};
module.exports = constructorMethod;