const express = require("express");
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require("./routes");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});
app.use("/public", static);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
configRoutes(app);
app.listen(3000, () => {
    console.log("Server running! Check http://localhost:3000");
    console.log("Your routes will be running on http://localhost:3000");
});
