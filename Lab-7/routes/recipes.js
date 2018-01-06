const express = require("express");
const router = express.Router();
const data = require("../data");
const recipedata = data.recipes;

router.get("/:id",async (req,res) => {
    await recipedata.getRecipe(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({error: "Recipe is not found"});
    });
});

router.get("/", async(req,res) => {
    await recipedata.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }).catch((err) => {

        res.status(500).json({ error: err });
    });
});

router.post("/", async(req, res) => {
    let recipepostdata = req.body;
    await recipedata.addRecipe(recipepostdata.title, recipepostdata.ingredients, recipepostdata.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }).catch((err) => {
        res.status(500).json({error: err});
    });
});

router.put("/:id",async (req, res) => {
    let updateddata = req.body;
    await recipedata.getRecipe(req.params.id)
        .then(() => {
            return recipedata.updateRecipe(req.params.id, updateddata)
                .then((updatedRecipe) => {
                    res.json(updatedRecipe);
                }).catch((err) => {
                    res.status(500).json({ error: err });
                });
        }).catch(() => {
        res.status(404).json({error: "Recipe is not found"});
    });

});

router.delete("/:id", async(req, res) => {
    await recipedata.getRecipe(req.params.id).then(() => {
        return recipedata.deleteRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch((err) => {
        console.log(err);
        res.status(404).json({error: "Recipe is not found"});
    });
});


module.exports = router;