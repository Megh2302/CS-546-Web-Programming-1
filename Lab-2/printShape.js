module.exports = {
    triangle:(lines)=>{
        if (lines === undefined || typeof lines !== 'number')
        {
            throw "Input a number";
        }
        if (lines < 1)
        {
            throw "input is not greater than 1";
        }
        let i;
        for (i = 0; i <= lines - 1; i++)
        {
            if (i === lines - 1)
            {
                console.log(" ".repeat(lines - i) + "/" + "--".repeat(i) + "\\")
            }
            else
            {
                console.log(" ".repeat(lines - i) + "/" + "  ".repeat(i) + "\\")
            }
        }
    },

    square:(lines)=>{
        if (lines === undefined || typeof lines !== "number")
        {
            throw "Input a number";
        }
        if (lines < 2)
        {
            throw "Input must greater than 1.";
        }
        let i, x;
        for (i = 0; i <= lines-1; i++)
        {
            if (i == 0 || i == lines-1)
            {
                console.log("|" + "-".repeat(lines) + "|");
            }
            else
            {
                console.log("|" + " ".repeat(lines) + "|");
            }
        }
    },

    rhombus:(lines)=>{
        if (lines === undefined || typeof lines !== "number")
        {
            throw "Input a number";
        }
        if (lines % 2 != 0)
        {
            throw "Input must an even number";
        }
        if (lines === 0)
        {
            throw "Input must greater than 0";
        }
        for(i=0;i<=(lines/2)-1;i++)
        {
            if (i === 0)
            {
                console.log(" ".repeat(lines/2 - i) + "/" + "-" + "\\");
            }
            else
            {
                console.log(" ".repeat(lines/2 - i) + "/" + "  ".repeat(i) + " " + "\\");
            }
        }
        for(i=0;i<=(lines/2)-1;i++)
        {
            if(i === (lines/2)-1)
            {
                console.log(" " + " ".repeat(i) + "\\" + "-" + "/")
            }
            else
            {
                console.log(" " + " ".repeat(i) + "\\" + " ".repeat( 2 * ((lines/2)- 1 - i) + 1) + "/");
            }
        }
    }
};