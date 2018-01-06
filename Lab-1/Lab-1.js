// Name: Megh Yogeshkumar Vankawala CWID:10421684 LAB1 Assignment


//sumOfSquares(num1, num2, num3)
function sumOfSquares(num1, num2, num3)
{
    return Math.pow(num1, 2) + Math.pow(num2, 2) + Math.pow(num3, 2);
}

//sayHelloTo(firstName, lastName, title)
function sayHelloTo(firstName, lastName, title)
{
    if (firstName === undefined && lastName === undefined && title === undefined)
    {
        throw "Input String"
    }
    else if (lastName === undefined && title === undefined)
    {
        console.log(`Hello, ${firstName}!`);
    }
    else if (title === undefined)
    {
        console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
    }
    else
    {
        console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
    }
}

//cupsOfCoffee(howManyCups)
function cupsOfCoffee(howManyCups)
{
    let string = "";
    let i = howManyCups;
    if (i <= 0)
    {
        throw "Number should be greater than 0.";
    }
    else
    {
        while (i > 0)
        {
            if (i > 2)
            {
                let string1 = `\n${i} cups of coffee on the desk! ${i} cups of coffee! \nPick one up, drink the cup, ${i - 1} cups of coffee on the desk!\n`;
                i--;
                string = `${string}${string1}`;
            }
            else if (i === 2)
            {
                let string2 = `2 cups of coffee on the desk! 2 cups of coffee! \nPick one up, drink the cup, 1 cup of coffee on the desk!\n`;
                i--;
                string = `${string}\n${string2}\n`;
            }
            else if (i === 1)
            {
                let string3 = `1 cup of coffee on the desk! 1 cup of coffee! \nPick it up, drink the cup, no more coffee left on the desk!\n`;
                i--;
                string = `${string}${string3}`;
            }
        }
        return string;
    }
}

// occurrencesOfSubstring(fullString, substring)
function occurrencesOfSubstring(fullString, substring)
{
    let count = 0;
    let flength = fullString.length;
    let slength = substring.length;
    let i;
    if (slength > 1)
    {
        for (i = 0; i <= flength; i++)
        {
            let p = 0;
            let j = i + 1;
            let k = 1;
            while (j <= i + slength - 1 && k <= i + slength - 1)
            {
                if (fullString[i] === substring[0] && fullString[j] === substring[k])
                    p++;
                    j++;
                    k++;
            }
            if (p === slength - 1)
                count++;
        }
        return count;
    }
    else
    {
        for (i = 0; i <= flength; i++)
        {
            if (fullString[i] === substring)
                count++;
        }
        return count;
    }
}

// randomizeSentences(paragraph)
function randomizeSentences(paragraph)
{
     let p = paragraph.split(/[.!]/);
     let l = p.length-1;
     let random = [];
     let i;
     for (i = 0; i < l; i++)
     {
         let currentindex = Math.floor(Math.random()*(l - i));
         random.push(p[currentindex]);
         p.splice(currentindex,1);
     }
     let r = "";
     for(let i = 0; i < l; i++)
     {
         if (" Hello, world" !== random[i])
         {
             r += random[i] + ".";
         }
         else
         {
             r += random[i] + "!";
         }
     }
     return r;
}





console.log(sumOfSquares(3,10,5));
console.log(sumOfSquares(1,2,3));
console.log(sumOfSquares(3,4,5));
console.log(sumOfSquares(5,6,7));
console.log(sumOfSquares(7,8,9));
console.log("\n");

try
{
    sayHelloTo();
}
catch (e)
{
    console.log(e);
}
sayHelloTo("Megh");
sayHelloTo("Megh","Vankawala");
sayHelloTo("Megh","Vankawala","Mr.");
console.log("\n");

console.log(cupsOfCoffee(5));
console.log("\n");

console.log(occurrencesOfSubstring("hello world", "o"));
console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));
console.log("\n");


let p = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences(p));
