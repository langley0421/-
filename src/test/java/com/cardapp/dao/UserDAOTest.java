package com.cardapp.dao;

import com.cardapp.model.User;
import com.cardapp.util.DatabaseUtil; // For direct cleanup if needed
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled; // To disable tests that require DB interaction

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

@Disabled("These tests require a live database connection and proper data setup/cleanup strategies.")
class UserDAOTest {

    private UserDAO userDAO;
    private User testUser;

    @BeforeEach
    void setUp() {
        userDAO = new UserDAO();
        testUser = new User();
        testUser.setEmail("testuser@example.com");
        testUser.setPassword("password123"); // In a real scenario, this would be a hashed password

        // Assumption: The database is clean or test data is managed externally.
        // For robust tests, ensure the user does not exist before adding
        // or use a dedicated test database that is reset.
        // For now, we attempt cleanup in AfterEach.
    }

    @AfterEach
    void tearDown() {
        // Cleanup: Attempt to delete the test user.
        // This is a simplified cleanup. A real application might have a dedicated
        // deleteUserByEmail method in UserDAO or use a DB management tool for cleanup.
        if (testUser != null && testUser.getEmail() != null) {
            try (Connection conn = DatabaseUtil.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement("DELETE FROM user WHERE email = ?")) {
                pstmt.setString(1, testUser.getEmail());
                pstmt.executeUpdate();
            } catch (SQLException e) {
                // Log or print, but don't fail the test itself due to cleanup issues
                System.err.println("Error during cleanup: " + e.getMessage());
            }
        }
    }

    @Test
    void testAddUserAndGetUser() {
        // Arrange
        // testUser is already prepared in setUp

        // Act
        userDAO.addUser(testUser);
        User retrievedUser = userDAO.getUserByEmail(testUser.getEmail());

        // Assert
        assertNotNull(retrievedUser, "Retrieved user should not be null.");
        assertEquals(testUser.getEmail(), retrievedUser.getEmail(), "Emails should match.");
        // Note: Password comparison is tricky due to hashing.
        // If UserDAO.addUser hashes the password, the retrieved password will be the hash.
        // For this test, assuming UserDAO stores it as-is (as per current DAO impl).
        assertEquals(testUser.getPassword(), retrievedUser.getPassword(), "Passwords should match.");
    }

    @Test
    void testIsValidUser() {
        // Arrange: Add the user first
        userDAO.addUser(testUser);

        // Act & Assert
        // Test with correct credentials
        assertTrue(userDAO.isValidUser(testUser.getEmail(), testUser.getPassword()),
                   "Login should be successful with correct credentials.");

        // Test with incorrect password
        assertFalse(userDAO.isValidUser(testUser.getEmail(), "wrongpassword"),
                    "Login should fail with incorrect password.");

        // Test with non-existent user
        assertFalse(userDAO.isValidUser("nonexistent@example.com", "anypassword"),
                    "Login should fail for a non-existent user.");
    }
}
