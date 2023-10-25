window.onload = init;
const url = 'http://localhost:3000';

function init() {
	document.querySelector('.btn-primary').addEventListener('click', login);
}

function login() {
	const user = document.getElementById('input-user').value;
	const pass = document.getElementById('input-password').value;

	console.log(user, pass);

	axios({
		method: 'post',
		url: `${url}/user/login`,
		data: {
			user: user,
			password: pass
		}
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200 && res.data.success) {
			localStorage.setItem("token", res.data.message);
			window.location.href = 'pokedex.html';
		} else {
			alert("Usuario y/o contraseña incorrectos");
		}
	}).catch(function (err) {
		console.log(err);
	});
}