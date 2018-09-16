let postBase = `<div class="Post">
                <a href="{Link}"><h2>{Titulo}</h2>
                <p>{Contenido}</p></a> 
                <div class="bar"></div>
                </div>`;

let posts = document.getElementById("Posts");

class HttpClient {
    constructor() {
        this.get = function (aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            };
            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        };
    }
}

const username = 'HectorPulido';
const repository = 'hectorpulido.github.io';
const path = 'Posts/';

var client = new HttpClient();
client.get('https://api.github.com/repos/'+username+'/'+repository+'/contents/' + path, function(response) {
    let r = JSON.parse(response);

    r.forEach((element)=>
    {
        if(element.name !== "index.html")
        {
            let url = element.html_url.replace("github.com/"+username+"/", "").replace("/blob/master", "").replace("/tree/master", "");
            let data;
            client.get(url + "/content.json", (d)=>
            {
                data = JSON.parse(d);
                console.log(d);
            });
            posts.innerHTML += postBase.replace("{Titulo}",element.name).replace("{Contenido}",url + "/content.json" +data).replace("{Link}", url);
    
        }
    });

});