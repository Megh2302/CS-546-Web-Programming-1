const express = require("express");
const router = express.Router();
const data = require("../data");
const commentdata = data.recipes;

router.get("/recipe/:recipeId",async (req, res) => {
    await commentdata.getAllComments(req.params.recipeId).then((comments) => {
        res.json(comments);
    }).catch((err) => {
        res.status(404).json({ error: "Recipe is not found" });
    })
});

router.get("/:commentId",async (req, res) => {
    await commentdata.getComment(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch((err) => {
        res.status(404).json({ error: "Comment is not found." });
    })
});

router.post("/:recipeId", async(req, res) => {
    const commentsdata = req.body;
    try
    {
        const { poster, comment} = commentsdata;
        const newComment = await commentdata.addComment(req.params.recipeId, poster, comment);
        res.json(newComment);
    } catch(err){
        res.status(500).json({error: err});
    }
});
router.put("/:recipeId/:commentId", async(req, res) => {
    let updatedData = req.body;
    let getRecipe = await commentdata.getRecipe(req.params.recipeId);
    let getComment = await commentdata.getComment(req.params.commentId);
    getRecipe.then(() => {
        getComment.then(() => {
            return commentdata.updateComment(req.params.recipeId, req.params.commentId, updatedData)
                .then((updatedComment) => {
                    res.json(updatedComment);
                }).catch((err) => {
                    res.status(500).json({ error: err });
                });
        }).catch(() => {
            res.status(404).json({ error: "Comment is not found" });
        });

    }).catch(() => {
        res.status(404).json({ error: "Recipe is not found." });
    })

});
router.delete("/:id",async (req, res) => {
    let comment = await commentdata.getComment(req.params.id).then(() => {
        return commentdata.deleteComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Comment is not found" });
    })
});
module.exports = router;