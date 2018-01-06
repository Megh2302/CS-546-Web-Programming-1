const bluebird = require('bluebird');
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require('fs'));

module.exports = {
    getFileAsString:async function(path)
    {
        if (typeof (path)!='string' || !path)
        {
            throw "not a valid path"
        }
        var text = await fs.readFileAsync(path, "utf-8");
        return text;
    },
    getFileAsJSON:async function(path)
    {
        if (typeof (path)!='string' || !path)
        {
            throw "not a valid path"
        }
        var text = await fs.readFileAsync(path, "utf-8");
        let jsond = JSON.parse(text);
        return jsond;
    },
    saveStringToFile:async function(path, text)
    {
        if (typeof (path)!='string' || path===undefined || text===undefined || typeof (text)!='string')
        {
            throw "not a valid path or text"
        }
        await fs.writeFileAsync(path, text);
        return true;
    },
    saveJSONToFile:async function(path, obj)
    {
        if ((!path) || (!obj))
        {
            throw "not a valid path or object."
        }
        if (typeof (path)!='string')
        {
            throw "path must be string."
        }
        await fs.writeFileAsync(path, JSON.stringify(obj));
        return true;
    }
}
