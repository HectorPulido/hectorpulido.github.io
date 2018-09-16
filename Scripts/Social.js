let x = document.getElementsByClassName("ReplaceLink");

console.log(x);
for(i = 0; i < x.length; i++)
{
    x[i].href = x[i].href.replace("{CURRENTURL}", window.location.href );

}

