import config from "../config.js";

//let token = new URL(window.location.href).searchParams.get('token');
let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRoYW5hZWwiLCJpc3MiOiJQaHlzaWNzIEludmVudG9yeSBBdXRoZW50aWNhdGlvbiBTZXJ2aWNlIiwiaWF0IjoxNjY3MDU2MTc3LCJleHAiOjE2NjcwNTc5NzcsInJvbGVzIjoiIn0.TIAYL6KSR_ey0-xkTf7pZU10pR4gtqEhI09JrPyKdng";
if (token == null) {
    window.location.href = 'index.html';
}

document.getElementById('logo1').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");
document.getElementById('logo2').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");
document.getElementById('signOutButton').onclick = (event) => {
    fetch(config["server"].concat('/logout'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (r) {
        if (r.ok) {
            window.location.href = 'index.html'
        }
    });
}
