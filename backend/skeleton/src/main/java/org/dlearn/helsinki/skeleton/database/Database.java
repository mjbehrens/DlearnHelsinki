package org.dlearn.helsinki.skeleton.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dlearn.helsinki.skeleton.model.SpiderGraph;

public class Database {
	
	private static final String DB_DRIVER = "org.postgresql.Driver";
	private static final String DB_CONNECTION = "jdbc:postgresql://localhost:5432/Dlearn_db?verifyServerCertificate=false&useSSL=true";
	private static final String DB_USER = "postgres";
	private static final String DB_PASSWORD = "admin";
	
	public void testConnection() throws Exception{
		Connection dbConnection = null;
		PreparedStatement ps_select = null;
		ResultSet rs_index = null;
		
		try {
			dbConnection = getDBConnection();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			
			if (rs_index != null) {
				rs_index.close();
			}

			if (ps_select != null) {
				ps_select.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
		
	}
	
	public SpiderGraph getSpiderGraph(int student_id, int spidergraph_id) throws SQLException{
		
		SpiderGraph spidergraph = new SpiderGraph();
		
		Connection dbConnection = null;
		PreparedStatement ps_select = null;
		ResultSet rs_index = null;
		
		String selectBarFromId = "SELECT * FROM public.\"SpiderGraphs\" WHERE _id = " + spidergraph_id + " AND student_id = " + student_id;
		
		try {
			dbConnection = getDBConnection();
			// Set up batch of statements
			ps_select = dbConnection.prepareStatement(selectBarFromId);
			// execute query
			rs_index = ps_select.executeQuery();
			while (rs_index.next()) {
				spidergraph.set_id(spidergraph_id);
				spidergraph.setStudent_id(student_id);
				spidergraph.setValue1(rs_index.getInt(0));
				spidergraph.setValue2(rs_index.getInt(1));
				spidergraph.setValue3(rs_index.getInt(2));
				spidergraph.setValue4(rs_index.getInt(3));
				spidergraph.setValue5(rs_index.getInt(4));
			}

		} catch (SQLException e) {

			System.out.println(e.getMessage());

		} finally {
			
			if (rs_index != null) {
				rs_index.close();
			}

			if (ps_select != null) {
				ps_select.close();
			}

			if (dbConnection != null) {
				dbConnection.close();
			}
		}
		
		return spidergraph;
	}
	
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
	
	private static Connection getDBConnection() {

		Connection dbConnection = null;

		try {
			Class.forName(DB_DRIVER);
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
		try {
			dbConnection = DriverManager.getConnection(
                            DB_CONNECTION, DB_USER,DB_PASSWORD);
			return dbConnection;
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}

		return dbConnection;

	}
	
	@SuppressWarnings("unused")
	private static java.sql.Timestamp getCurrentTimeStamp() {

		java.util.Date today = new java.util.Date();
		return new java.sql.Timestamp(today.getTime());

	}
	
}

