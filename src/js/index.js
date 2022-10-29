import config from '../config.js'

document.getElementById('observatory').src = config["spaces"].concat("/logos/observatory.jpg");
document.getElementById('logo').src = config["spaces"].concat("/logos/B_Physics Inventory-03.png");
document.getElementById('signInForm').onsubmit = function(event) {
    event.preventDefault();
    sign_in();
}

const errorField = document.getElementById('login-error');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

function sign_in() {
    fetch(config["server"].concat("/login"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameField.value,
            password: passwordField.value
        })
    }).then(function (r) {
        if (r.status === 401) {
            errorField.innerText = 'Invalid username or password.';
        } else if (r.status === 500) {
            errorField.innerText = 'Internal Server Error.';
        } else if (!r.ok) {
            errorField.innerText = 'An unknown error occurred.';
        } else {
            return r.json();
        }
        return Promise.reject(errorField.innerText);
    }).then(body => {
        window.location.href = 'home.html?token=' + body.token
    }, () => {})
}
