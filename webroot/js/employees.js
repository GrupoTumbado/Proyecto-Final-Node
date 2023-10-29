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

	// Eventos
	/*const btnViewEmployees = document.getElementById('btn-view-employees');
	btnViewEmployees.addEventListener('click', loadEmployees);

	const btnNewEmployee = document.getElementById('btn-new-employee');
	btnNewEmployee.addEventListener('click', newEmployee);

	const btnAddEmployee = document.getElementById('btn-add-employee');
	btnAddEmployee.addEventListener('click', addEmployee);

	const btnDeleteEmployee = document.getElementById('btn-delete-employee');
	btnDeleteEmployee.addEventListener('click', deleteEmployee);

	const btnUpdateEmployee = document.getElementById('btn-update-employee');
	btnUpdateEmployee.addEventListener('click', updateEmployee);*/
	const btnNewEmployee = document.getElementById('btn-new-employee');
	btnNewEmployee.addEventListener('click', newEmployeeToggle);

	loadEmployees();
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
	console.log('Saved!')
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
	const row = $(`.test-row-${employeeId}`)

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
	employeesTable.innerHTML = ''; // Limpia el contenido del elemento
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
	const surname = document.getElementById('input-surname').value;
	const phone = document.getElementById('input-phone').value;
	const email = document.getElementById('input-email').value;
	const address = document.getElementById('input-address').value;

	axios({
		method: 'post',
		url: `${url}/employees`,
		data: {
			nombre: name,
			apellidos: surname,
			telefono: phone,
			mail: email,
			direccion: address
		},
		headers: headers,
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200 && res.data.success) {
			alert("Empleado agregado correctamente");
			loadEmployees();
		} else {
			alert("Error al agregar empleado");
		}
	}).catch(function (err) {
		console.log(err);
	});
}

function updateEmployee() {
	const id = document.getElementById('input-id').value;
	const name = document.getElementById('input-name').value;
	const lastName = document.getElementById('input-last-name').value;
	const phone = document.getElementById('input-phone').value;
	const email = document.getElementById('input-email').value;
	const address = document.getElementById('input-address').value;

	axios({
		method: 'put',
		url: `${url}/employees/${id}`,
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			mail: email,
			direccion: address
		},
		headers: headers,
	}).then(function (res) {
		console.log(res);

		if (res.data.code === 200 && res.data.success) {
			alert("Empleado actualizado correctamente");
			loadEmployees();
		} else {
			alert("Error al actualizar empleado");
		}
	}).catch(function (err) {
		console.log(err);
	});
}