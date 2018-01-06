module.exports={
    simplify:(text)=>
    {
        if (typeof text !== 'string' || text === undefined || text.length === 0)
        {
            throw "String is not valid";
        }
        text=text.toLowerCase();
        text=text.replace(/\\n|\\t/g," ").replace(/[^a-z0-9\s]/g," ").replace(/\s\s+/g," ").trim();
        return text;
    },
    createMetrics:(text)=>
    {
        text=module.exports.simplify(text);
        var words=text.split(" ");
        const wordOccurrences = words.reduce((obj, curr) => {
            obj[curr] = (obj[curr] || 0) + 1;
            return obj;
        }, {});
        var metric=
            {
                totalLetters: text.replace(/\s+/g, '').length,
                totalWords: words.length,
                uniqueWords: Object.keys(wordOccurrences).length,
                longWords: 0,
                averageWordLength: 0,
                wordOccurrences: wordOccurrences
            };
        let i;
        for(i in words)
        {
            if(words[i].length>=6)
            {
                metric.longWords++;
            }
        }
        metric.averageWordLength=metric.totalLetters/metric.totalWords;
        return metric;
    }
}