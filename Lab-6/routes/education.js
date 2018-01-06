const express = require("express");
const router = express.Router();

router.get('/',(req,res)=> {
        const educationData = [
            {
                "schoolName": "Stevens Institute of Technology",
                "degree": "Master of Science",
                "favoriteClass": "Web Programing",
                "favoriteMemory": "Playing bowling free for unlimited time."
            },
            {
                "schoolName": "Charotar University of Science and Technology",
                "degree": "Bachelor of Technology",
                "favoriteClass": "Web Technolgy",
                "favoriteMemory": "Doing fun with friends in Canteen was the best memory of that time."
            }
        ];

        res.send(educationData);
    },
    (error) => {
        res.sendStatus(404);
    });


module.exports = router;