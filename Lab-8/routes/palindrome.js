const express=require('express');
const router=express.Router();
router.get("/",(req,res) => {
    res.render('other/static');
});
module.exports = router;
