window.onload = init;
const url = 'http://localhost:3000';
let headers = {};

function init() {
	if (localStorage.getItem("token")) {
		headers = {
			'Authorization': 'Bearer ' + localStorage.getItem("token")
		};
	} else {
		window.location.href = "index.html";
	}

	const btnNewEmployee = document.getElementById('btn-new-employee');
	btnNewEmployee.addEventListener('click', newEmployeeToggle);

	loadEmployees();

	const btnAddEmployee = document.getElementById('btn-add-employee');
	btnAddEmployee.addEventListener('click', addEmployee);
}

function addEmployeeRow(employee) {
	const row = `<tr scope="row" class="employee-row-${employee.id}">
	    			   <td id="name-${employee.id}" data-employeeid="${employee.id}"><div contentEditable>${employee.nombre}</div></td>
	    			   <td id="surname-${employee.id}" data-employeeid="${employee.id}"><div contentEditable>${employee.apellidos}</div></td>
	    			   <td id="phone-${employee.id}" data-employeeid="${employee.id}"><div contentEditable>${employee.telefono}</div></td>
	    			   <td id="mail-${employee.id}" data-employeeid="${employee.id}"><div contentEditable>${employee.mail}</div></td>
	                   <td id="address-${employee.id}" data-employeeid="${employee.id}"><div contentEditable>${employee.direccion}</div></td>
	                   <td>
	                   		<button class="btn btn-sm btn-danger" data-employeeid=${employee.id} id="delete-${employee.id}">Delete</button>
	                   		<button class="btn btn-sm btn-info" disabled data-employeeid="${employee.id}" id="save-${employee.id}">Save</button>

	                   		<button class="btn btn-sm btn-danger hidden" data-employeeid="${employee.id}" id="cancel-${employee.id}">Cancel</button>
	                   		<button class="btn btn-sm btn-primary hidden" data-employeeid="${employee.id}" id="confirm-${employee.id}">Confirm</button>
	                   </td>
	    		   </tr>`;
	$('#employees-table').append(row);

	$(`#delete-${employee.id}`).on('click', deleteEmployee);
	$(`#cancel-${employee.id}`).on('click', cancelDeletion);
	$(`#confirm-${employee.id}`).on('click', confirmDeletion);
	$(`#save-${employee.id}`).on('click', saveUpdate);

	$(`#name-${employee.id}`).on('click', enableSaveButton);
	$(`#surname-${employee.id}`).on('click', enableSaveButton);
	$(`#phone-${employee.id}`).on('click', enableSaveButton);
	$(`#mail-${employee.id}`).on('click', enableSaveButton);
	$(`#address-${employee.id}`).on('click', enableSaveButton);
}

function enableSaveButton() {
	const employeeId = $(this).data('employeeid');
	const saveBtn = $(`#save-${employeeId}`);

	$(this).on('keyup', function () {
		saveBtn.prop('disabled', false)
	})
}

function saveUpdate() {
	updateEmployee( $(this).data('employeeid'));
	const employeeId = $(this).data('employeeid');
	var saveBtn = $(`#save-${employeeId}`)
	var row = $(`.test-row-${employeeId}`)

	saveBtn.prop('disabled', true)
	row.css('opacity', "0.5")

	setTimeout(function () {
		row.css('opacity', '1')
	}, 2000)
}

function deleteEmployee() {
	const employeeId = $(this).data('employeeid');

	const deleteBtn = $(`#delete-${employeeId}`)
	const saveBtn = $(`#save-${employeeId}`)
	const cancelBtn = $(`#cancel-${employeeId}`)
	const confirmBtn = $(`#confirm-${employeeId}`)

	deleteBtn.addClass('hidden')
	saveBtn.addClass('hidden')

	cancelBtn.removeClass('hidden')
	confirmBtn.removeClass('hidden')
}

function cancelDeletion() {
	const employeeId = $(this).data('employeeid');

	const deleteBtn = $(`#delete-${employeeId}`);
	const saveBtn = $(`#save-${employeeId}`)
	const cancelBtn = $(`#cancel-${employeeId}`)
	const confirmBtn = $(`#confirm-${employeeId}`)

	deleteBtn.removeClass('hidden')
	saveBtn.removeClass('hidden')

	cancelBtn.addClass('hidden')
	confirmBtn.addClass('hidden')

}

function confirmDeletion() {
	const employeeId = $(this).data('employeeid');

	axios({
		method: 'delete',
		url: `${url}/employees/${employeeId}`,
		headers: headers
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200) {
			alert("Empleado eliminado correctamente");
			loadEmployees();
		} else {
			alert("Error al eliminar empleado");
		}
	}).catch(function (err) {
		console.log(err);
	});
}

function loadEmployees() {
	axios.get(url + "/employees", {
		headers: headers,
	})
	.then(function (res) {
		displayEmployees(res.data.message);
	})
	.catch(function (err) {
		console.log(err);
	});
}

function displayEmployees(employees) {
	const employeesTable = document.getElementById('employees-table');
	employeesTable.innerHTML = '';
	employees.forEach(employee => {
		addEmployeeRow(employee)
	});
}

function newEmployeeToggle() {
	const form = $('.form-wrapper');
	if (form.hasClass('hidden')) {
		form.removeClass('hidden');
	} else {
		form.addClass('hidden');
	}
}

function addEmployee() {
	const name = document.getElementById('input-name').value;
	const lastName = document.getElementById('input-surname').value;
	const phone = document.getElementById('input-phone').value;
	const mail = document.getElementById('input-mail').value;
	const address = document.getElementById('input-address').value;

	axios({
		method: 'post',
		url: `${url}/employees`,
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			mail: mail,
			direccion: address
		},
		headers: headers,
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200) {
			alert("Empleado añadido correctamente");
			loadEmployees();
		} else {
			alert("Error al añadir empleado");
		}
	}).catch(function (err) {
		console.log(err);
	});
}


function updateEmployee(employeeId) {
	const name = $(`#name-${employeeId}`).find('div').text();
	const lastName = $(`#surname-${employeeId}`).find('div').text();
	const phone = $(`#phone-${employeeId}`).find('div').text();
	const mail = $(`#mail-${employeeId}`).find('div').text();
	const address = $(`#address-${employeeId}`).find('div').text();

	axios({
		method: 'put',
		url: `${url}/employees/${employeeId}`,
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			mail: mail,
			direccion: address
		},
		headers: headers,
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200) {
			alert("Empleado actualizado correctamente");
			loadEmployees();
		} else {
			alert("Error al actualizar empleado");
		}
	}).catch(function (err) {
		console.log(err);
	});
}