package org.dlearn.helsinki.skeleton.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.dlearn.helsinki.skeleton.model.Student;

@Path("/students")
public class StudentResource {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getStudents(@PathParam("student_id") int student_id){
		return (new Student(student_id, "lastname", "firstname", "username", "password")).toString();
	}

	@GET
	@Path("/{student_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Student getStudentFromId(@PathParam("student_id") int student_id){
		return new Student(student_id, "lastname", "firstname", "username", "password");
	}
}
