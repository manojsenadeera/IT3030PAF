package com;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import model.AppointmentDAO;
import services.AppointmentService;

import java.sql.SQLException;
import java.util.List;

@Path("/Appointment")
public class AppointmentController {

	AppointmentDAO appointmentDAO = new AppointmentDAO();
	AppointmentService appService= new AppointmentService();
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDAO> getAppointments() throws SQLException {
		return appService.getAppointments();
	}
	
	@Path("/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public AppointmentDAO getAppointment(@PathParam("id") int id) throws SQLException {
		return appService.getAppointemnt(id);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDAO createAppointment(AppointmentDAO a) throws SQLException {
		appService.createApponitment(a);
		return a;
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDAO updateAppointment(AppointmentDAO a) throws SQLException {
		
		if(appService.getAppointemnt(a.getId()).getId()==0) {
			appService.createApponitment(a);
		}
		else
		{
			appService.updateAppointment(a);
						
		}
		return a;
	}
	
	@Path("/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteAppointment(@PathParam("id") int id) throws SQLException {
		appService.deleteAppointment(id);
	}
	
}
