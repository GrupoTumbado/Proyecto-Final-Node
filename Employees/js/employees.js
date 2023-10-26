window.onload = init;
var headers = {};
var url = 'http://localhost:3000';

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };
    } else {
        window.location.href = "index.html";
    }
    // Eventos
    const btnViewEmployees = document.getElementById('btn-view-employees');
    btnViewEmployees.addEventListener('click', loadEmployees);

    const btnAddEmployee = document.getElementById('btn-add-employee');
    btnAddEmployee.addEventListener('click', addEmployees);

    const btnDeleteEmployee = document.getElementById('btn-delete-employee');
    btnDeleteEmployee.addEventListener('click', deleteEmployees);

    const btnUpdateEmployee = document.getElementById('btn-update-employee');
    btnUpdateEmployee.addEventListener('click', updateEmployees);

}

function loadEmployees() {
    axios.get(url + "/employees", headers)
        .then(function (res) {
            displayEmployees(res.data.message);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function displayEmployees(employees) {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = ''; // Limpia el contenido del elemento
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        employeeDiv.innerHTML = `
            <h3>ID: ${employee.id}</h3>
            <p>Name: ${employee.nombre}</p>
            <p>Last Name: ${employee.apellidos}</p>
            <p>Phone: ${employee.telefono}</p>
            <p>Email: ${employee.mail}</p>
            <p>Address: ${employee.direccion}</p>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

function addEmployees(){
    const name = document.getElementById('input-name').value;
    const lastName = document.getElementById('input-last-name').value;
    const phone = document.getElementById('input-phone').value;
    const email = document.getElementById('input-email').value;
    const address = document.getElementById('input-address').value;

    axios({
        method: 'post',
        url: `${url}/employees`,
        data: {
            nombre: name,
            apellidos: lastName,
            telefono: phone,
            mail: email,
            direccion: address
        },
        headers
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

function deleteEmployees(){
    const id = document.getElementById('input-id').value;

    axios({
        method: 'delete',
        url: `${url}/employees/${id}`,
        headers
    }).then(function (res) {
        console.log(res);

        if (res.data.code === 200 && res.data.success) {
            alert("Empleado eliminado correctamente");
            loadEmployees();
        } else {
            alert("Error al eliminar empleado");
        }
    }).catch(function (err) {
        console.log(err);
    });
}

function updateEmployees(){
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
        headers
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