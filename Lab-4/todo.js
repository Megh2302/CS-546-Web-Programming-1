const uuidv4 = require('uuid/v4');
const getCollectionFn = require('./mongoCollections');
module.exports = {
    async createTask(title, description)
    {
        if (title === undefined)
        {
            throw 'title is not define'
        }
        if (description === undefined)
        {
            throw 'description is not define'
        }
        let todo_collections = await getCollectionFn();
        const id = uuidv4()
        let newtasks=
            {
                _id : id,
                title: title,
                description: description,
                "completed" : "false",
                "completedAt" : null
            };
        const insertInfo = await todo_collections.insertOne(newtasks)
        if (insertInfo.insertedCount === 0) throw 'could not add new todo_item'
        const newId = insertInfo.insertedId;
        const todo = await this.getTask(newId);
        return todo;
    },
    async getAllTasks()
    {
        const todo_collections = await getCollectionFn();
        const tasks = await todo_collections.find({}).toArray();
        return tasks;
    },
    async getTask(id)
    {
        if (!id)
            throw "You must provide an id to search for";
        const todo_collections = await getCollectionFn();
        const task1 = await todo_collections.findOne({ _id: id });
        if (task1 === null)
            throw "No task with that id";
        return task1;
    },
    async completeTask(taskId)
    {
        if(!taskId)
        {
            throw "Need to provide a id!";
        }
        let Time= new Date();
        let current_Time = Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds();
        let todo_collections = await getCollectionFn();
        const updateInfo = await todo_collections.updateOne({ _id: taskId }, {$set:{'completed' : true,'completedAt' :current_Time}});
        if (updateInfo.modifiedCount === 0)
        {
            throw `could not update ${taskId} successfully`;
        }
        return await this.getTask(taskId);
    },
    async removeTask(id)
    {
        if (!id) throw "You must provide an id to search for";
        const todo_collections = await getCollectionFn();
        const deletionInfo = await todo_collections.removeOne({ _id: id });
        if((deletionInfo.deletedCount)===0)
        {
            throw `Could not delete task with id of ${id}`;
        }
    },
};


