const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const records = [
    {
        _id : "0001",
        username : "masterdetective123",
        firstName : "Sherlock",
        lastName : "Holmes",
        profession: "Detective",
        bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
        hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
    },
    {
        _id : "0002",
        username : "lemon",
        firstName : "Elizabeth",
        lastName : "Lemon",
        profession: "Writer",
        bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
        hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
    },
    {
        _id: "0003",
        username : "theboywholived",
        firstName : "Harry",
        lastName : "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
    }
]
passport.serializeUser(function (user, done)
{
    done(null, user._id);
});

passport.deserializeUser(async function (id, done)
{
    done(null, await fuid(id));
});
passport.use('local', new LocalStrategy(
    async function (username, password, done)
    {
        try {
            const currentuser = await User(username);
            await comparepwd(password, currentuser.hashedPassword);
            return done(null, currentuser);
        }
        catch (err)
        {
            return done(null, false, { "message": err });
        }
    })
);
async function fuid(id)
{
    try {
        let currentuser = records.filter(function (obj)
        {
            return obj._id === id;
        })[0];
        if (currentuser === undefined)
        {
            throw "User is not valid";
        }
        else
        {
            return currentuser;
        }
    }
    catch (err)
    {
        throw err;
    }
}
async function User(username)
{
    try {
        let currentuser = records.filter(function (obj) {
            return obj.username === username;
        })[0];
        if (currentuser === undefined)
        {
            throw "User is not valid";
        }
        else
        {
            return currentuser;
        }
    }
    catch (err)
    {
        throw err;
    }
}
async function comparepwd(password, hashedPassword)
{
    try {
        let res = await bcrypt.compareSync(password, hashedPassword);
        if(res)
        {
            return res;
        }
        else
        {
            throw "password is invalid";
        }
    }
    catch (err)
    {
        throw err;
    }
}
function isLogedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.sendStatus(401);
}

router.get("/", (req, res) => {
    if (req.isAuthenticated())
    {
        res.render('private', { user: req.user});
    }
    else
    {
        let err = req.flash('error');
        res.render('login', { errors: err });
    }
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/private',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/private", isLogedIn, (req, res) => {
    res.render('private',{user:req.user});
});
module.exports = router;