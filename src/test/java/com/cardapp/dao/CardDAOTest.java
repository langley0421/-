package com.cardapp.dao;

import com.cardapp.model.Card;
import com.cardapp.model.Company;
import com.cardapp.model.Department;
import com.cardapp.model.Position;
import com.cardapp.util.DatabaseUtil;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Disabled("These tests require a live database connection and complex data setup/cleanup strategies for foreign keys.")
class CardDAOTest {

    private CardDAO cardDAO;
    private CompanyDAO companyDAO; // Needed for prerequisite data
    private DepartmentDAO departmentDAO; // Needed for prerequisite data
    private PositionDAO positionDAO; // Needed for prerequisite data

    private Company testCompany;
    private Department testDepartment;
    private Position testPosition;
    private Card testCard1;
    private Card testCard2; // For favorite test

    @BeforeEach
    void setUp() {
        cardDAO = new CardDAO();
        companyDAO = new CompanyDAO();
        departmentDAO = new DepartmentDAO();
        positionDAO = new PositionDAO();

        // --- Setup Prerequisite Data ---
        // In a real test suite, this would be more robust, possibly using a dedicated
        // test data setup library or ensuring the DB is in a known state.
        // For now, we'll add them and attempt to clean up.
        // This also assumes these DAOs' add methods work correctly.

        testCompany = new Company();
        testCompany.setCompany_name("Test Corp");
        testCompany.setZipcode("12345");
        testCompany.setAddress("1 Test St");
        testCompany.setPhone("555-0100");
        // The addCompany method in CompanyDAO does not return ID. We need to fetch it.
        // This is a simplification; real tests might need a more reliable way to get IDs.
        companyDAO.addCompany(testCompany);
        testCompany.setCompany_id(getLatestCompanyId()); // Helper method to get ID

        testDepartment = new Department();
        testDepartment.setDepartment_name("Test Dept");
        departmentDAO.addDepartment(testDepartment);
        testDepartment.setDepartment_id(getLatestDepartmentId());

        testPosition = new Position();
        testPosition.setPosition_name("Test Role");
        positionDAO.addPosition(testPosition);
        testPosition.setPosition_id(getLatestPositionId());

        // --- Prepare Test Card Objects ---
        testCard1 = new Card();
        testCard1.setName("John Doe");
        testCard1.setEmail("john.doe@testcorp.com");
        testCard1.setCompany_id(testCompany.getCompany_id());
        testCard1.setDepartment_id(testDepartment.getDepartment_id());
        testCard1.setPosition_id(testPosition.getPosition_id());
        testCard1.setRemarks("Test card 1");
        testCard1.setFavorite(false);

        testCard2 = new Card();
        testCard2.setName("Jane Smith (Favorite)");
        testCard2.setEmail("jane.smith@testcorp.com");
        testCard2.setCompany_id(testCompany.getCompany_id());
        testCard2.setDepartment_id(testDepartment.getDepartment_id());
        testCard2.setPosition_id(testPosition.getPosition_id());
        testCard2.setRemarks("Test card 2 - Favorite");
        testCard2.setFavorite(true);
    }

    @AfterEach
    void tearDown() {
        // Cleanup: Delete cards first, then prerequisite data.
        // Order matters due to foreign key constraints.
        // This is a simplified cleanup. Robust tests would handle failures gracefully.
        deleteCardByEmail(testCard1.getEmail());
        deleteCardByEmail(testCard2.getEmail());

        if (testPosition != null && testPosition.getPosition_id() > 0) {
            positionDAO.deletePosition(testPosition.getPosition_id());
        }
        if (testDepartment != null && testDepartment.getDepartment_id() > 0) {
            departmentDAO.deleteDepartment(testDepartment.getDepartment_id());
        }
        if (testCompany != null && testCompany.getCompany_id() > 0) {
            companyDAO.deleteCompany(testCompany.getCompany_id());
        }
    }

    private void deleteCardByEmail(String email) {
        if (email == null) return;
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement("DELETE FROM card WHERE email = ?")) {
            pstmt.setString(1, email);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error during card cleanup: " + e.getMessage());
        }
    }
    
    // Helper methods to get last inserted ID (very basic, assumes single-threaded test execution)
    private int getLatestId(String tableName, String idColumnName) {
        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT MAX(" + idColumnName + ") FROM " + tableName)) {
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1; // Should not happen in a successful add
    }

    private int getLatestCompanyId() { return getLatestId("company", "company_id"); }
    private int getLatestDepartmentId() { return getLatestId("department", "department_id"); }
    private int getLatestPositionId() { return getLatestId("position", "position_id"); }


    @Test
    void testAddCardAndGetCard() {
        // Arrange
        // testCard1 is prepared in setUp. Foreign key IDs should be set.

        // Act
        cardDAO.addCard(testCard1);
        // CardDAO.addCard does not return the ID. We need to retrieve it another way.
        // For this test, we'll assume it's the only card for this email or try to get by email.
        // A more robust approach would be to enhance addCard to return ID or have a unique constraint.
        int addedCardId = getLatestId("card", "card_id"); // Get last inserted card ID.
        assertTrue(addedCardId > 0, "Added card ID should be positive.");

        Card retrievedCard = cardDAO.getCardById(addedCardId);

        // Assert
        assertNotNull(retrievedCard, "Retrieved card should not be null.");
        assertEquals(testCard1.getName(), retrievedCard.getName(), "Names should match.");
        assertEquals(testCard1.getEmail(), retrievedCard.getEmail(), "Emails should match.");
        assertEquals(testCard1.getCompany_id(), retrievedCard.getCompany_id(), "Company IDs should match.");
        assertEquals(testCard1.getDepartment_id(), retrievedCard.getDepartment_id(), "Department IDs should match.");
        assertEquals(testCard1.getPosition_id(), retrievedCard.getPosition_id(), "Position IDs should match.");
        assertEquals(testCard1.isFavorite(), retrievedCard.isFavorite(), "Favorite status should match.");
        // Timestamps (created_date, update_date) are set by DAO, so direct comparison is tricky.
        // We can assert they are not null.
        assertNotNull(retrievedCard.getCreated_date(), "Created date should not be null.");
        assertNotNull(retrievedCard.getUpdate_date(), "Update date should not be null.");
    }

    @Test
    void testGetFavoriteCards() {
        // Arrange: Add both cards
        cardDAO.addCard(testCard1); // Not favorite
        cardDAO.addCard(testCard2); // Favorite

        // Act
        List<Card> favoriteCards = cardDAO.getFavoriteCards();

        // Assert
        assertNotNull(favoriteCards, "Favorite cards list should not be null.");
        assertEquals(1, favoriteCards.size(), "Should retrieve only one favorite card.");
        
        Card retrievedFavoriteCard = favoriteCards.get(0);
        assertEquals(testCard2.getName(), retrievedFavoriteCard.getName(), "Favorite card name should match testCard2.");
        assertTrue(retrievedFavoriteCard.isFavorite(), "Card retrieved should be marked as favorite.");
        
        // Ensure testCard1 is not in the list
        for (Card card : favoriteCards) {
            assertNotEquals(testCard1.getName(), card.getName(), "Non-favorite card should not be in the list.");
        }
    }
}
