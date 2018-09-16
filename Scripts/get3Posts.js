let postBase = `<div class="col-md-4">
                <a href="{Link}"><h3>{Titulo}</h3>
                <p>{Descripcion}</p></a>
                <a href="{Link}" class="btn btn-lg btn-secondary">Leer todo.</a>
                </div>`;

let posts = document.getElementById("entradas");

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
    let i = 0;
    r.forEach((element)=>
    {
        if(element.name !== "index.html")
        {
            let url = element.html_url.replace("github.com/"+username+"/", "").replace("/blob/master", "").replace("/tree/master", "");
            client.get(url + "/content.json", (d)=>
            {
                i = i + 1;
                let data = JSON.parse(d);
                posts.innerHTML += postBase.replace("{Titulo}", data.Title).replace("{Contenido}", data.Description).replace("{Link}", url);
            });
            
            if(i>=3)
            {
                return;
            }
        }
    });

});