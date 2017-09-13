package org.dlearn.helsinki.skeleton.service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.dlearn.helsinki.skeleton.database.Database;
import org.dlearn.helsinki.skeleton.model.SpiderGraph;


public class SpiderGraphService {
	
	Database db = new Database();
	
	public SpiderGraphService(){
		super();
	}
	
	public ArrayList<SpiderGraph> getSpiderGraphsFromStudentId(int student_id){
		ArrayList<SpiderGraph> spidergraphs = new ArrayList<SpiderGraph>();
		spidergraphs.add(new SpiderGraph(1,2,3,4,5,6,7));
		spidergraphs.add(new SpiderGraph(1,2,3,4,5,6,7));
		return spidergraphs;
	}
	
	public SpiderGraph getSpiderGraphFromid(int student_id, int spidergraph_id){
		System.out.println("Calling SpiderGraphFromId");
		try {
			return db.getSpiderGraph(student_id, spidergraph_id);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return new SpiderGraph(-1,-1,-1,-1,-1,-1,-1);
	}

}
