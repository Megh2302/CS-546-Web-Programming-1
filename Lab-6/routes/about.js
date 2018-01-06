const express = require("express");
const router = express.Router();
router.get('/',(req,res)=> {

        const aboutData = {
            "name": "Megh Vankawala",
            "biography": "I am Megh Vankawala. \nI am doing MS in Computer Science at Stevens Institute of Technology.",
            "favoriteShows": ["Agents of S.H.I.L.D.", "TVF Tripling", "TVF Bachelors"],
            "hobbies": ["Music", "Sports", "Traveling"]
        };
        res.send(aboutData);
},
    (error) => {
    res.sendStatus(404);
});

module.exports = router;