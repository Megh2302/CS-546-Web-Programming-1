const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require("uuid");

const exportedMethods = {

    async getAllRecipes()
    {
        const recipesCollection = await recipes();
        const allrecipes = await recipesCollection.find({}, { title: 1 }).toArray();
        return allrecipes;
    },

    async getRecipe(id)
    {
        if(!id)
        {
            throw "You must provide id";
        }
        const recipesCollection = await recipes();
        const recipe = await recipesCollection.findOne({ _id: id });
        if (!recipe)
        {
            throw "Recipe is not found";
        }
        return recipe;
    },

    async addRecipe(title, ingredients, steps)
    {
        if (title === "" || typeof title !== "string")
        {
            throw "title is not provided";
        }
        if (ingredients.length <= 0)
        {
            throw "must be atleast one ingredients";
        }
        if (steps.length <= 0)
        {
            throw "must be atleast one step for your recipe";
        }
        if (!Array.isArray(ingredients))
        {
            throw "You must supply ingredients with keys 'name' and 'amount'";
        }
        if (!Array.isArray(steps))
        {
            throw "You must provide an array of steps for your recipe.";
        }
        for (let i = 0; i < ingredients.length; i++)
        {
            if (ingredients[i].name === "" || typeof ingredients[i].name !== "string")
            {
                throw "Name must be a string";
            }
            if (ingredients[i].amount === "" || typeof ingredients[i].amount !== "string")
            {
                throw "the amount must be in correct format";
            }
        }
        for (let i = 0; i < steps.length; i++)
        {
            if (steps[i] === "" || typeof steps[i] !== "string")
            {
                throw "must be define a proper method for making the recipe"
            }
        }
        const recipesCollection = await recipes();
        const newrecipe =
            {
                _id: uuid.v4(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: []
            };
        const newrecipeinfo = await recipesCollection.insertOne(newrecipe);
        const newId = newrecipeinfo.insertedId;
        insertedrecipe = await this.getRecipe(newId);
        return insertedrecipe;
    },

    async updateRecipe(id, updatedRecipe)
    {
        const recipesCollection = await recipes();
        const updatedrecipedata = {};
        if (updatedRecipe.title === "" || updatedRecipe.title)
        {
            if (updatedRecipe.title === "" || typeof updatedRecipe.title !== "string")
            {
                throw "title is not provided";
            }
            updatedrecipedata.title = updatedRecipe.title;
        }
        if (updatedRecipe.ingredients === "" || updatedRecipe.ingredients)
        {
            if (updatedRecipe.ingredients.length <= 0)
            {
                throw "There must be atleast one ingredients";
            }
            if (!Array.isArray(updatedRecipe.ingredients))
            {
                throw "It must name and amount for the ingredients";
            }
            for (let i = 0; i < updatedRecipe.ingredients.length; i++)
            {
                if (typeof updatedRecipe.ingredients[i].name !== "string" || updatedRecipe.ingredients[i].name === "")
                {
                    throw "Name must be a string";
                }
                if (typeof updatedRecipe.ingredients[i].amount !== "string" || updatedRecipe.ingredients[i].amount === "")
                {
                    throw "the amount must be in correct format";
                }
            }
            updatedrecipedata.ingredients = updatedRecipe.ingredients;
        }
        if (updatedRecipe.steps === "" || updatedRecipe.steps)
        {
            if (updatedRecipe.steps.length <= 0)
            {
                throw "must atleast  one step for recipe";
            }
            if (!Array.isArray(updatedRecipe.steps))
            {
                throw "must be atleast one step";
            }
            for (let i = 0; i < updatedRecipe.steps.length; i++)
            {
                if (updatedRecipe.steps[i] === "" || typeof updatedRecipe.steps[i] !== "string")
                {
                    throw "Must define method for the recipe"
                }
            }
            updatedrecipedata.steps = updatedRecipe.steps;
        }
        let updatecommand =
            {
                $set: updatedrecipedata
            };
        const query =
            {
                _id: id
            };
        await recipesCollection.updateOne(query, updatecommand);
        return await this.getRecipe(id);
    },

    async deleteRecipe(id)
    {
        const recipesCollection = await recipes();
        const deletioninfo = await recipesCollection.removeOne({ _id: id });
        if (deletioninfo.deletedCount === 0)
        {
            throw `Could not delete recipe with id of ${id}`;
        }
    },

    async getAllComments(id)
    {
        const recipesCollection = await recipes();
        const recipe = await recipesCollection.findOne({ _id: id });
        if (!recipe)
        {
            throw "no such recipe found";
        }
        let recipetitle = recipe.title;
        let recipecomment = recipe.comments;
        let commentlist = [];
        for (let i = 0; i < recipecomment.length; i++)
        {
            list =
                {
                _id: recipecomment[i]._id,
                recipeId: id,
                recipetitle: recipetitle,
                poster: recipecomment[i].poster,
                comment: recipecomment[i].comment
            };
            commentlist.push(list);
        }
        return commentlist;
    },

    async getComment(id)
    {
        const recipesCollection = await recipes();
        const recipe = await recipesCollection.findOne({"comments._id": id});
        const recipecomments = await recipesCollection.findOne({ "comments._id": id },{"comments.$": 1, _id: 0});
        if(!recipecomments)
        {
            throw "no such comments found";
        }
        let recipeId = recipe._id;
        let recipetitle = recipe.title;
        let commentlist =
            {
            _id: id,
            recipeId: recipeId,
            recipetitle: recipetitle,
            poster: recipecomments.comments[0].poster,
            comment: recipecomments.comments[0].comment
        }
        return commentlist;
    },

    async addComment(id, poster, comment)
    {
        if(!poster)
        {
            throw "You must provide the name of poster";
        }
        if(!comment)
        {
            throw "You must provide a comment";
        }
        const recipesCollection = await recipes();
        const newcomment =
            {
            _id: uuid.v4(),
            poster: poster,
            comment: comment
        };
        await recipesCollection.updateOne({ _id: id }, { $push: { comments: newcomment } });
        return newcomment;
    },

    async updateComment(recipeId, commentId, updatedComment) {
        const recipesCollection = await recipes();
        const updateddommentdata = {};
        if(updatedComment.poster || updatedComment.comment)
        {
            if(updatedComment.poster && updatedComment.comment)
            {
                if (updatedComment.poster === "" || typeof updatedComment.poster !== "string")
                {
                    throw "poster name is not provided";
                }
                recipesCollection.updateOne(
                    {
                        _id: recipeId,
                        comments: { $elemMatch: {_id: commentId}}
                    },
                    { $set: {"comments.$.poster": updatedComment.poster, "comments.$.comment":updatedComment.comment}}
                )
            }
            else if((!updatedComment.poster && updatedComment.comment) || (updatedComment.comment === ""))
            {
                recipesCollection.updateOne(
                    {
                        _id: recipeId,
                        comments: { $elemMatch: {_id: commentId}}
                    },
                    { $set: {"comments.$.comment":updatedComment.comment}}
                )
            }
            else if((!updatedComment.comment && updatedComment.poster) || (updatedComment.poster === ""))
            {
                recipesCollection.updateOne(
                    {
                        _id: recipeId,
                        comments: { $elemMatch: {_id: commentId}}
                    },
                    { $set: {"comments.$.poster":updatedComment.poster}}
                )
            }
        }
        if ((updatedComment.comment === "") || updatedComment.comment)
        {
            if (typeof updatedComment.comment !== "string" || updatedComment.comment === "")
            {
                throw "no comments to update";
            }
            await recipesCollection.updateOne(
                {
                    _id: recipeId,
                    comments: { $elemMatch: {_id: commentId}}
                },
                { $set: {"comments.$.comment": updatedComment.comment}}
            )
            updateddommentdata.comment = updatedComment.comment;
        }
        if ((updatedComment.poster === "") || updatedComment.poster)
        {
            if (typeof updatedComment.poster !== "string" || updatedComment.poster === "")
            {
                throw "name is not provided";
            }
            await recipesCollection.updateOne(
                {
                    _id: recipeId,
                    comments: { $elemMatch: {_id: commentId}}
                },
                { $set: {"comments.$.poster": updatedComment.poster}}
            )
            updateddommentdata.poster = updatedComment.poster;
        }
        const updatedrecipecomments = await recipesCollection.findOne({ "comments._id": commentId }, {"comments.$": 1, _id: 0});
        return updatedrecipecomments.comments[0];
    },

    async deleteComment(id)
    {
        const recipesCollection = await recipes();
        const deletioninfo = await recipesCollection.update({ "comments._id": id }, { $pull: { comments: { _id: id } } });
        if (deletioninfo.deletedCount === 0) {
            throw `Could not delete recipe with id of ${id}`;
        }
    },
};
module.exports = exportedMethods;