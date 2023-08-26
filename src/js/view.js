import config from "../config.js";
import nav from "./partials/nav.js"

let token = sessionStorage.getItem('token');
let params = new URL(window.location.href).searchParams
if (token == null) {
    window.location.href = 'index.html?from=view&' + params
} else if (!params.has("id")) {
    window.location.href = 'home.html'
}

let navDoc = document.createElement("nav");
navDoc.className = 'bg-white shadow-sm';
navDoc.innerHTML = nav;
document.getElementById("mainDiv").prepend(navDoc);
document.getElementById('logo1').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");
document.getElementById('logo2').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");

function checkResponse(response) {
    console.log(response.status)
    if (response.status === 401) {
        window.location.href = 'index.html?from=view&' + new URL(window.location.href).searchParams
    } else if (response.status !== 200) {
        alert('An error occurred.')
        window.history.back()
    } else {
        return response;
    }
}

fetch(config["server"].concat('/app/assets/asset?id=') + params.get("id"), {
    method: 'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': token
    }
}).then(response => checkResponse(response))
    .then(response => response.text())
    .then(body => JSON.parse(body))
    .then(results => {
        document.getElementById("name").innerText = results.name;
        document.getElementById("name2").innerText = results.name;
        document.getElementById("desc").innerText = [results.brand, results.model, results.partNo,
            results.serialNo].filter(x => typeof x === 'string' && x.length > 0).join(" : ");
        const images = results.images
        if (images !== null) {
            document.getElementById('image').src = config['spaces'].concat('/images/', images[0])
        }
    })
