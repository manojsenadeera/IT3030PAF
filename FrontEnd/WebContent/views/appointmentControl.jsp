<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Appointments </title>
    
    <link rel="stylesheet" href="/FrontEnd/css/material-icons.css">
    <link rel="stylesheet" href="/FrontEnd/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/bootstrap.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/customStyles.css">
    <script src="/FrontEnd/js/jquery.min.js"></script>
    <script src="/FrontEnd/js/bootstrap3.3.7.min.js"></script>
    <script src="/FrontEnd/Controllers/appointmentController.js"></script>
</head>

<body>
<div class="wrapper d-flex align-items-stretch">
        
         <!-- Page Content  -->

        <div class="container" >
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2> <b>Appointments</b></h2>
                        </div>
                        <div class="col-sm-6">
                            <a href="#addModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add Appointment</span></a>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" id="inputSearch" class="form-control" placeholder="Patient ID / Doctor ID / Department ID ">
                    <input type="button" class="btn btn-default" id="searchBtn" value="Search">
                    <input type="button" class="btn btn-warning" id="ResetBtn" value="Reset">
                </div>
                  <div class="form-group">
                    <input type="button" class="btn btn-default" onclick='sortTable("all")' value="All">
                    <input type="button" class="btn btn-primary" onclick='sortTable("Paid")' value="Paid">
                    <input type="button" class="btn btn-success" onclick='sortTable("Not Paid")' value="Not Paid">
                </div>
                <table class="table table-striped table-hover" id="listtable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient ID</th>
                            <th>Doctor ID</th>
                            <th>Department ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
        <!-- Add Modal HTML -->
        <div id="addModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Add Appointment</h4>
                            
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Doctor ID :</label>
                                <input type="text" class="form-control" id="inputdoc" required>
                            </div>
                            <div class="form-group">
                                <label>Start Time :</label>
                                <input type="time" class="form-control" id="inputstarttime">
                            </div>
                            <div class="form-group">
                                <label>End Time :</label>
                                <input type="time" class="form-control" id="inputendtime">
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <input type="date" class="form-control" id="inputdate">
                            </div>
                            <div class="form-group">
                                <label>Patient ID : :</label>
                                <input type="text"  class="form-control" id="inputpatient"  required>
                            </div>
                            <div class="form-group">
                                <label>Department ID:</label>
                                <input type="text" class="form-control" id="inputdept"  required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-success" id="formCreateBtn" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- View Modal HTML -->
        <div id="viewModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">View Appointment</h4>
                            
                        </div>
                        <div class="modal-body">
                        	<div class="form-group">
                                <label>Start Time :</label>
                                <span id="startTime"></span>
                            </div>
                            <div class="form-group">
                                <label>End Time :</label>
                                <span id="endTime"></span>
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <span id="date"></span>
                            </div>
                            <div class="form-group">
                                <label>Patient Id :</label>
                                <span id="patientId"></span>
                            </div>
                            <div class="form-group" >
                                <label>Doctor Id :</label>
                                <span id="doctorId"></span>
                            </div>
                            <div class="form-group" >
                                <label>Department Id :</label>
                                <span id="departmentid"></span>
                            </div>
                            <div class="form-group">
                                <label>status :</label>
                                <span id="status"></span>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Appointment</h4>
                            
                        </div>
                  		<div class="modal-body">
                            <div class="form-group">
                                <label>Doctor ID :</label>
                                <input type="text" class="form-control" id="docEdit" required>
                            </div>
                            <div class="form-group">
                                <label>Start Time :</label>
                                <input type="time" class="form-control" id="starttimeEdit">
                            </div>
                            <div class="form-group">
                                <label>End Time :</label>
                                <input type="time" class="form-control" id="endtimeEdit">
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <input type="date" class="form-control" id="dateEdit">
                            </div>
                            <div class="form-group">
                                <label>Patient ID : :</label>
                                <input type="text"  class="form-control" id="patientEdit"  required>
                            </div>
                            <div class="form-group">
                                <label>Department ID:</label>
                                <input type="text" class="form-control" id="deptEdit"  required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-info" id="formEditBtn" value="Update">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Delete Modal HTML -->
        <div id="deleteModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Delete Appointment</h4>
                            
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete these Records?</p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-danger" id="formDeleteBtn" value="Delete">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Alert Modal HTML -->
        <div id="AlertModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title" id="alertTitle"></h4>
                        </div>
                        <div class="modal-body">
                            <p id="AlertMsg"></p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" id="CloseBtn" class="btn btn-default" data-dismiss="modal" value="close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</body>

</html>