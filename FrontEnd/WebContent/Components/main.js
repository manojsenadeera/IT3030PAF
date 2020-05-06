var user = {
	username: "",
	password: "",
    fname: "",
    lname: "",
    email: "",
    type: ""
};
$(document).ready(function() {
    $("#alertSuccess").hide();
    $("#alertError").hide();
});


//Login----------------
var input = $('.validate-input .input100');

$('.validate-form').on('submit', function() {
    var check = true;
            
    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    var $username = input[0].value;
    var $pw = input[1].value;


    var $url = "http://localhost:8080/demorest/webapi/login/" + $username+"/"+$pw;
    $.ajax({
        url: $url,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            console.log(data)
            if (data.type == "user") {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                sessionStorage.setItem("userType", data.type);
                sessionStorage.setItem("id", data.id);
                window.location = "/FrontEnd/views/UserPages/ticketControl.jsp";
            } else if (data.type == "admin") {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                sessionStorage.setItem("userType", data.type);
                sessionStorage.setItem("id", data.id);
                window.location = "/FrontEnd/views/AdminPages/ticketControl.jsp";
            } 
            else if (data.type == "staff") {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                sessionStorage.setItem("userType", data.type);
                sessionStorage.setItem("id", data.id);
                window.location = "/FrontEnd/views/StaffPages/ticketControl.jsp";
            } else {
                alert("login failed");
            }


        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Invalid User Name Password';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Invalid User Name Password.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
    });
    return false;

});


$('.validate-form .input100').each(function() {
    $(this).focus(function() {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'text') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)$/) == null) {
            return false;
        }
    } else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function setCreateData() {

		var validate=true;
		user.fname = document.getElementById("inputfname").value;
		user.lname = document.getElementById("inputlname").value;
		user.email = document.getElementById("inputemail").value;
		user.username = document.getElementById("inputusername").value;
		user.password = document.getElementById("inputpw").value;
	    if (user.fname == "") {
	    	document.getElementById("inputfname").style.outline = "solid red 2px";
		    validate=false;
		  }
	    else
	    	document.getElementById("inputfname").style.outline = "";
	    if (user.email == "") {
	    	document.getElementById("inputemail").style.outline = "solid red 2px";
		    validate=false;
		  }
	    else
	    	document.getElementById("inputemail").style.outline = "";
	    	
	    if (user.username == "") {
	    	document.getElementById("inputusername").style.outline = "solid red 2px";
		    validate=false;
		  }
	    else
	    	document.getElementById("inputusername").style.outline = "";
	    if (user.lname == "") {
	    	document.getElementById("inputlname").style.outline = "solid red 2px";
		    validate=false;
		  }
	    else
	    	document.getElementById("inputlname").style.outline = "";
	    if (user.password == "") {
	    	document.getElementById("inputpw").style.outline = "solid red 2px";
		    validate=false;
		  }
	    else
	    	document.getElementById("inputpw").style.outline = "";
	    	
	    return validate;
	

}

$(document).on("click", "#formCreateBtn", function() {
	 if(setCreateData()){
		    var formData = new FormData($('#createForm')[0]);
		    user.type="user";
		    formData.append('file', $('input[type=file]')[0].files[0]);
		    formData.append('obj', JSON.stringify(user));
		    $.ajax({
		        data: formData,
		        type: 'POST',
		        contentType: false,
		        processData: false,

		        url: "http://localhost:8080/demorest/webapi/signup/",
		        success: function(data, textStatus, jqXHR)  {
		        	 if (textStatus != "nocontent") {
		                 $('#confirmModel').modal();
		             } else {
		                 $('#failModel').modal();
		             }
		        },
		        error: function(jqXHR, exception) {
		            var msg = '';
		            if (jqXHR.status === 0) {
		                msg = 'Cannot create record due to server error';
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
		            alert(msg);
		        }
		    })
		    }
});
$(document).on("click", "#TeacherformCreateBtn", function() {
	 if(setCreateData()){
		 user.type="teacher";
		    var formData = new FormData($('#createForm')[0]);

		    formData.append('file', $('input[type=file]')[0].files[0]);
		    formData.append('obj', JSON.stringify(user));
		    $.ajax({
		        data: formData,
		        type: 'POST',
		        contentType: false,
		        processData: false,

		        url: "http://localhost:8080/demorest/webapi/signup/",
		        success: function(data, textStatus, jqXHR)  {
		        	 if (textStatus != "nocontent") {
		                 $('#confirmModel').modal();
		             } else {
		                 $('#failModel').modal();
		             }
		        },
		        error: function(jqXHR, exception) {
		            var msg = '';
		            if (jqXHR.status === 0) {
		                msg = 'Cannot create record due to server error';
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
		            alert(msg);
		        }
		    })
		    }
});
