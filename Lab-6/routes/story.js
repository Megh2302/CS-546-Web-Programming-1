const express = require("express");
const router = express.Router();

router.get('/',(req,res)=> {
        const storyData = {
            "storyTitle": "Two lappies and 2 phones",
            "story": "Three years ago, I wanted laptop and mobile phone for my work. But for some reason, I was not able to buy. At that time I waited for three to four months for buying phone and laptop. After that I decided that I would purchase both on my Birthday and before one day of my Birthday, I bought both. On my Birthday, my sister sent surprise gift for me. When I opened the box, It was same Mobile and Laptop in that box as I bought a day before. First, I really shocked but as I am a huge fan of Electronic Gadgets, It became an Excitement for me."
        };
        res.send(storyData);
    },
    (error) => {
        res.sendStatus(404);
    });
module.exports = router;