window.onload = init;

function init() {
	document.querySelector('#btn-login').addEventListener('click', login);
	document.querySelector('#btn-register').addEventListener('click', register);
	document.querySelector('#btn-employees').addEventListener('click', employees);
}

function login() {
	window.location.href = "login.html";
}

function register() {
	window.location.href = "register.html";
}

function employees() {
	window.location.href = "employees.html";
}