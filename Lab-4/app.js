const todo = require('./todo')
const connect = require('./mongoConnection')

async function main ()
{
    const firstTask  = await todo.createTask("Ponder Dinosaurs",
    "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
    console.log(firstTask);

    const secondTask  = await todo.createTask("Play Pokemon with Twitch TV",
    "Should we revive Helix?");

    const allTasks = await todo.getAllTasks();
    console.log(allTasks);

    await todo.removeTask(firstTask._id);

    const remainingTasks = await todo.getAllTasks();
    console.log(remainingTasks);

    await todo.completeTask(secondTask._id);

    const completedTask = await todo.getTask(secondTask._id);
    console.log(completedTask);

    const db = await connect();
    await db.close()
    console.log('Complete');
}
try
{
    main()
}
catch(err)
{
    console.log(err);
}


