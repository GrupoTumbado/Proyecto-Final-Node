window.onload = init;
const url = 'http://localhost:3000';
let headers = {};

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    } else {
        window.location.href = "login.html";
    }

    document.querySelector('.btn-primary').addEventListener('click', register);
}

function register() {
    const name = document.getElementById('input-name').value;
    const mail = document.getElementById('input-mail').value;
    const pass = document.getElementById('input-password').value;
    const nickname = document.getElementById('input-nickname').value;

    console.log(name, mail, pass);

    axios({
        method: 'post',
        url: `${url}/user/sign_in`,
        headers: headers,
        data: {
            username: name,
            mail: mail,
            password: pass,
            nickname: nickname
        }
    }).then(function (res) {
        console.log(res);
        alert("Usuario registrado correctamente")
    }).catch(function (err) {
        console.log(err);
    })
}