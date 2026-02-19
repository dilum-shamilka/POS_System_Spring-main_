const baseUrl = "http://localhost:8080/api/v1/customer";

$(document).ready(function () {
    getAllCustomer();
});

function saveCustomer() {
    event.preventDefault(); // Important: Stops form submission reload

    const name = $('#name').val();
    const address = $('#address').val();

    if (!name || !address) {
        alert("Name and Address are required!");
        return;
    }

    $.ajax({
        url: baseUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name, address }),
        success: function (response) {
            alert(response.message);
            getAllCustomer();
            clearCustomer();
        },
        error: function (error) {
            showError(error);
        }
    });
}

function updateCustomer() {
    event.preventDefault();

    const id = $('#id').val();
    const name = $('#name').val();
    const address = $('#address').val();

    if (!id) {
        alert("Select a customer from the table first!");
        return;
    }

    $.ajax({
        url: baseUrl,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ id, name, address }),
        success: function (response) {
            alert(response.message);
            getAllCustomer();
            clearCustomer();
        },
        error: function (error) {
            showError(error);
        }
    });
}

function deleteCustomer() {
    event.preventDefault();

    const id = $('#id').val();

    if (!id) {
        alert("Select a customer to delete!");
        return;
    }

    if (confirm("Are you sure you want to delete this customer?")) {
        $.ajax({
            url: baseUrl + "/" + id,
            method: 'DELETE',
            success: function (response) {
                alert(response.message);
                getAllCustomer();
                clearCustomer();
            },
            error: function (error) {
                showError(error);
            }
        });
    }
}

function getAllCustomer() {
    $('#customer-list').empty();

    $.ajax({
        url: baseUrl,
        method: 'GET',
        success: function (response) {
            // Your Controller returns List<CustomerDTO>, which is a plain JSON Array
            response.forEach(customer => {
                const row = `
                    <tr onclick="selectCustomer('${customer.id}', '${customer.name}', '${customer.address}')" style="cursor:pointer">
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                    </tr>`;
                $('#customer-list').append(row);
            });
        },
        error: function (error) {
            console.error("Error fetching customers:", error);
        }
    });
}

function selectCustomer(id, name, address) {
    $('#id').val(id);
    $('#name').val(name);
    $('#address').val(address);
}

function clearCustomer() {
    $('#id').val('');
    $('#name').val('');
    $('#address').val('');
}

function showError(error) {
    if (error.responseJSON && error.responseJSON.message) {
        alert("Error: " + error.responseJSON.message);
    } else {
        alert("Server connection failed. Check if Backend is running.");
    }
}