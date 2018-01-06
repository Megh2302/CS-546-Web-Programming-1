(function()
{
    let palindrome =
        {
            isPalindrome: function(str)
            {
                if (typeof str !== "string")
                {
                    throw "Must provide a number";
                }
                else if (str == null)
                {
                    throw "Must provide a string";
                }
                else if(str.length == 0)
                {
                    throw "must provide input"
                }
                else
                {
                     str = str.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'');
                     str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`'"?~()]/g,"");
                     str = str.replace("[", "");
                     str = str.replace(/[\[\]']+/g,'');
                     str = str.replace(/[\n\r\t]+/g, ' ');
                     str = str.replace(/(\r\n|\n|\r)/g, " ");
                     let j = str.length - 1;
                     for (let i = 0; i < str.length; i++)
                     {
                        if (str[i] != str[j])
                            return false;
                        j--;
                     }
                    return true;
                }
            }
        };
    var errorContainer = document.getElementById("error-container");
    var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
    var resultContainer = document.getElementById("result-container");
    var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
    var static=document.getElementById('f_static');
    var	list=document.getElementById('p_checker');
    static.addEventListener('submit', function(event)
    {
        event.preventDefault();
        try{
            errorContainer.classList.add("hidden");
            resultContainer.classList.add("hidden");
            var isPalindrome=palindrome['isPalindrome'];
            var text = document.getElementById("palindrome").value;

            if(text.trim().length === 0)
            {
                document.getElementById("error-container").style.display = "block";
                throw "Type Valid String";
            }
            else document.getElementById("error-container").style.display = "none";
            var li = document.createElement("li");
            var result = isPalindrome(text);
            if(result)
            {
                li.classList.add('is-palindrome');
            }
            else
            {
                li.classList.add('not-palindrome')
            }
            li.appendChild(document.createTextNode(text));
            list.appendChild(li);
        }
        catch(e)
        {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }
    });
})();