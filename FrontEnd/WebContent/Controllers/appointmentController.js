
var appointment = {
		id:'',
		startTime:'',
		endTime:'',
		date:'',
		patientId:'',
		doctorId:'',
		departmentId:'',
		status:'',

};
var appointments = [];

var Searchappointments = [];
var appointmenttable = ["id", "patientId", "doctorId","departmentId", "date","status"];
var $rootUrl = "http://localhost:8080/HospitalMng/AppointmentService/Appointment/";
var $globalUrl = "";
$(document).ready(function() {
    $.ajax({
        url: $rootUrl,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
        	appointments = data;
        	tableCreation(appointments);

        }
    });


});

function ViewbuttonClick(para) {
	 $.ajax({
	        url: $rootUrl+para,
	        contentType: 'application/json',
	        dataType: 'json',
	        type: 'GET',
	        success: function(data) {
	        	appointment = data;
	        	 setViewData();

	        }
	    });

   
}

function deletebuttonClick(para) {
    $globalUrl = $rootUrl + para;

}

function editbuttonClick(para) {
	$.ajax({
        url: $rootUrl+para,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
        	appointment=data;
        	setEditViewData();
        }
	});
    
}

$(document).on("click", "#formCreateBtn", function() {
    if(setAddData()) {
        $url = $rootUrl;

        $.ajax({
            type: "POST",
            url: $url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(appointment),
            dataType: 'json',
            success: function () {
                alertModifier('create', 'success');
                $('#AlertModal').modal('show');
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Fail to create Appontment due to server error';
                } else if (jqXHR.status == 404) {
                    msg = 'No Access';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alertModifier('create', msg);
                $('#AlertModal').modal('show');
            }
        });

    }
});

$(document).on("click", "#formDeleteBtn", function() {
    $.ajax({
        url: $globalUrl,
        contentType: 'application/json',
        dataType: 'json',
        type: 'DELETE',
        success: function(data) {
            alertModifier('delete', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot delete the Record \nRelated Payment Found';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alertModifier('create', msg);
            $('#AlertModal').modal('show');
        }
    });
});

$(document).on("click", "#formEditBtn", function() {
    setEditData();
    $url = $rootUrl;
    $.ajax({
        type: "PUT",
        url: $url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(appointment),
        dataType: 'json',
        success: function() {
            alertModifier('update', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot update the Record';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alertModifier('create', msg);
            $('#AlertModal').modal('show');
        }
    });
});

$(document).on("click", "#searchBtn", function() {
    Searchappointments = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    appointments.forEach(function(item) {
        if (item["patientId"] == searchinput||item["doctorId"] == searchinput||item["departmentId"] == searchinput) {
            Searchappointments.push(item)
        }
    });
 
    tableCreation(Searchappointments);

});

$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(appointments)
});

function tableCreation(para) {
    if (document.getElementById("listtable") != null) {
        var table = document.getElementById("listtable");
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        para.forEach(function(item) {
            userSelect = item["id"];
            var row = document.createElement("tr");
            appointmenttable.forEach(function(key) {
                var cell = document.createElement("td");
                if (key == "date") {
                    cell.textContent = item[key].replace('Z', '');
                } else {
                    cell.textContent = item[key];
                }
                row.appendChild(cell);
            });
            var cellview = document.createElement("td");
            cellview.innerHTML = "<a href='#viewModal' onclick='ViewbuttonClick(" + userSelect + ")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>visibility</i></a>";
            row.appendChild(cellview);
	    	var celledit = document.createElement("td");
	        celledit.innerHTML = "<a href='#editModal' class='edit' onclick='editbuttonClick(" + userSelect + ")'  data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a>";
	        row.appendChild(celledit);
	        var celldelete = document.createElement("td");
	        celldelete.innerHTML = "<a href='#deleteModal' class='delete' onclick='deletebuttonClick(" + userSelect + ")' data-toggle='modal'><i  class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>";
	        row.appendChild(celldelete);
	        tbody.appendChild(row);
        });
    }
}

function setAddData() {
    var validate=true;
    appointment.startTime = document.getElementById("inputstarttime").value;
    appointment.endTime = document.getElementById("inputendtime").value;
    appointment.patientId =document.getElementById("inputpatient").value;
    appointment.doctorId = document.getElementById("inputdoc").value;
    appointment.departmentId = document.getElementById("inputdept").value;
    appointment.status = "not Paid"
    	appointment.date=document.getElementById("inputdate").value;
    if (appointment.startTime == "") {
        document.getElementById("inputstarttime").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputstarttime").style.outline = "";
    if (appointment.endTime == "") {
        document.getElementById("inputendtime").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputendtime").style.outline = "";
    if (appointment.patientId == "") {
        document.getElementById("inputpatient").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputpatient").style.outline = "";
    if (appointment.doctorId == "") {
        document.getElementById("inputdoc").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputdoc").style.outline = "";
    if (appointment.departmentId == "") {
        document.getElementById("inputdept").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputdept").style.outline = "";
    if (appointment.date == "") {
        document.getElementById("inputdate").style.outline = "solid red 2px";
        validate=false;
    }
    else
        document.getElementById("inputdate").style.outline = "";
    return validate;

}

function setViewData() {
	
	document.getElementById("startTime").innerHTML = appointment.startTime;
    document.getElementById("endTime").innerHTML = appointment.endTime;
    document.getElementById("patientId").innerHTML = appointment.patientId;
    document.getElementById("doctorId").innerHTML = appointment.doctorId;
    document.getElementById("departmentid").innerHTML = appointment.departmentId;
    document.getElementById("status").innerHTML = appointment.status;
    document.getElementById("date").innerHTML = appointment.date.replace('Z', '');
}

function setEditViewData() {
	var starttimeEdit = appointment.startTime.replace('.',':');
	var endtimeEdit =appointment.endTime.replace('.',':');
	document.getElementById("starttimeEdit").value=starttimeEdit;
	document.getElementById("endtimeEdit").value = endtimeEdit;
	document.getElementById("patientEdit").value= appointment.patientId;
	document.getElementById("docEdit").value= appointment.doctorId;
	document.getElementById("deptEdit").value=appointment.departmentId;
	document.getElementById("dateEdit").value=appointment.date;
	
    
}

function setEditData() {
	appointment.startTime = document.getElementById("starttimeEdit").value;
	appointment.endTime = document.getElementById("endtimeEdit").value;
	appointment.patientId =document.getElementById("patientEdit").value;
	appointment.doctorId = document.getElementById("docEdit").value;
	appointment.departmentId = document.getElementById("deptEdit").value;
	appointment.date=document.getElementById("dateEdit").value;
}



function sortTable(para) {
    sortedappointments = [];
    removetble();
    switch (para) {
        case 'all':
        	appointments.forEach(function(appointment) {
        		sortedappointments.push(appointment);
            });
            break;
        case 'Paid':
        	appointments.forEach(function(appointment) {
                if (appointment["status"] == "paid") {
                	sortedappointments.push(appointment);
                }
            });
            break;
        case 'Not Paid':
        	appointments.forEach(function(appointment) {
                if (appointment["status"]== "not paid") {
                	sortedappointments.push(appointment);
                }
            });
            break;
    }
    tableCreation(sortedappointments)
}

function removetble() {
    var myTable = document.getElementById('listtable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
$(document).on("click", "#CloseBtn", function(appointment) {
    window.location.reload();
});

function alertModifier(para1, para2) {
    if (para2 == 'success') {
        document.getElementById('alertTitle').innerHTML = "Succeed";
        switch (para1) {
            case 'create':
                document.getElementById('AlertMsg').innerHTML = "appointment Added Successfully";
                break;
            case 'update':
                document.getElementById('AlertMsg').innerHTML = "appointment Updated Successfully";
                break;
            case 'delete':
                document.getElementById('AlertMsg').innerHTML = "appointment Deleted Successfully";
                break;
            case 'closed':
                document.getElementById('AlertMsg').innerHTML = "appointment Closed Successfully";
                break;
            case 'Rejected':
                document.getElementById('AlertMsg').innerHTML = "appointment Rejected Successfully";
                break;
        }
    } else {
        document.getElementById('alertTitle').innerHTML = "Failed";
        document.getElementById('AlertMsg').innerHTML = para2;

    }
}