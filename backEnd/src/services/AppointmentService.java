package services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.AppointmentDAO;

public class AppointmentService {
	
	List<AppointmentDAO> appointments;
	Connection conn=null;
	
	public AppointmentService() {
		
		String url="jdbc:mysql://localhost:3306/appointment";
		String usrName="root";
		String pw="root1234";
	
		
			try {
				Class.forName("com.mysql.jdbc.Driver");
				conn=DriverManager.getConnection(url,usrName,pw);
			} catch (ClassNotFoundException | SQLException e) {
				System.out.println(e);
			}
		
		
	}
	
	public List<AppointmentDAO> getAppointments() throws SQLException {
		
		List<AppointmentDAO> appointments=new ArrayList<>();
		String query="select * from appointment_details";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				AppointmentDAO a=new AppointmentDAO();
				a.setId(rs.getInt(1));
				a.setDate(rs.getDate(2));
				a.setStartTime(rs.getString(3));
				a.setEndTime(rs.getString(4));
				a.setPatientId(rs.getInt(5));
				a.setDoctorId(rs.getInt(6));
				a.setDepartmentId(rs.getInt(7));
				a.setStatus(rs.getString(8));
				appointments.add(a);
			}

		return appointments;
	}
	
	public AppointmentDAO getAppointemnt(int id) throws SQLException {
	
		AppointmentDAO a=new AppointmentDAO();
		String query="select * from appointment_details where id="+id;

			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				a.setId(rs.getInt(1));
				a.setDate(rs.getDate(2));
				a.setStartTime(rs.getString(3));
				a.setEndTime(rs.getString(4));
				a.setPatientId(rs.getInt(5));
				a.setDoctorId(rs.getInt(6));
				a.setDepartmentId(rs.getInt(7));
				a.setStatus(rs.getString(8));
			}
			

		return a;
		
	}
	
	
	public void createApponitment(AppointmentDAO a) throws SQLException {
		
		 String query = " insert into appointment_details (app_date, start_time, end_time, patient_id,doctor_id, department_id,status) "
	    		  + " values ( ?, ?, ?, ?, ?, ?,?)";
			PreparedStatement st=conn.prepareStatement(query);
			st.setDate(1, a.getDate());
			st.setString(2, a.getStartTime());
			st.setString(3, a.getEndTime());
			st.setInt(4, a.getPatientId());
			st.setInt(5, a.getDoctorId());
			st.setInt(6, a.getDepartmentId());
			st.setString(7, a.getStatus());
			st.executeUpdate();
		

		
	}
	
	public void updateAppointment(AppointmentDAO a) throws SQLException {
		
		String query="UPDATE appointment_details SET app_date=?,start_time=?,end_time=?,patient_id=?,doctor_id=?,department_id=? WHERE id=?";
			
			PreparedStatement st=conn.prepareStatement(query);

			st.setDate(1, a.getDate());
			st.setString(2, a.getStartTime());
			st.setString(3, a.getEndTime());
			st.setInt(4, a.getPatientId());
			st.setInt(5, a.getDoctorId());
			st.setInt(6, a.getDepartmentId());
			st.setInt(7, a.getId());
			st.executeUpdate();

		
	}
	
	
	
	public void deleteAppointment(int id) throws SQLException {
		
		String query="delete from appointment_details where id=?";
			
			PreparedStatement st=conn.prepareStatement(query);

			st.setInt(1, id);
			st.executeUpdate();

	}
	
}
