package com.cardapp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtil {
    // IMPORTANT: These are placeholder credentials.
    // In a real application, externalize these (e.g., environment variables, config file).
    private static final String URL = "jdbc:mysql://localhost:3306/db_cardApp?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    private static final String USERNAME = "your_db_username"; // TODO: Replace with your actual database username
    private static final String PASSWORD = "your_db_password"; // TODO: Replace with your actual database password

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            // Consider logging this exception or handling it more gracefully
            e.printStackTrace(); // Simple error printing for now
            throw new SQLException("MySQL JDBC Driver not found.", e);
        }
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}
