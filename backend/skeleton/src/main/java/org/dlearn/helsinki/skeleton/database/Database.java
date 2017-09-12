package org.dlearn.helsinki.skeleton.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Database {
	
	private static final String DB_DRIVER = "org.postgresql.Driver";
	private static final String DB_CONNECTION = "jdbc:postgresql://localhost:5432/postgres?verifyServerCertificate=false&useSSL=true";
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
	
	public int getBarFromId(String id) throws SQLException{
		
		int random_attr = -1;
		
		Connection dbConnection = null;
		PreparedStatement ps_select = null;
		ResultSet rs_index = null;
		
		String selectBarFromId = "SELECT * FROM nightapp_database.bars WHERE _id = \"" + id + "\"";
		
		try {
			dbConnection = getDBConnection();
			// Set up batch of statements
			ps_select = dbConnection.prepareStatement(selectBarFromId);
			// execute query
			rs_index = ps_select.executeQuery();
			while (rs_index.next()) {
				random_attr = rs_index.getInt(0);
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
		
		return random_attr;
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

