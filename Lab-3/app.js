const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const fd = require("./fileData");
const tm = require("./textMetrics");

async function main(num)
{
    if(num === undefined || (!num) || num>3)
    {
        throw "input is not valid";
    }
    const fileexist = fs.existsSync(`./chapter${num}.result.json`);
    if(fileexist)
    {
        const fjson = await fd.getFileAsJSON(`./chapter${num}.result.json`);
        console.log(fjson);
    }
    else
    {
        let fstr = await fd.getFileAsString(`./chapter${num}.txt`);
        fstr = tm.simplify(fstr);
        await fd.saveStringToFile(`chapter${num}.debug.txt`,fstr);
        let output = tm.createMetrics(fstr);
        console.log(output);
        await fd.saveJSONToFile(`chapter${num}.result.json`,output);
    }
}
try
{
    main(1);
    main(2);
    main(3);
}
catch(err)
{
    console.log(err);
}
try
{
    console.log(tm.createMetrics("Helllo, my -! This is a great day to say helllo.\\n\\n\\tHelllo! 2 3 4 23"));
}
catch(err)
{
    console.log(err);
}
