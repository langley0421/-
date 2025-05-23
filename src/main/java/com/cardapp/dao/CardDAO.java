package com.cardapp.dao;

import com.cardapp.model.Card;
import com.cardapp.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class CardDAO {

    public void addCard(Card card) {
        String sql = "INSERT INTO card (company_id, department_id, position_id, name, email, remarks, favorite, created_date, update_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, card.getCompany_id());
            pstmt.setInt(2, card.getDepartment_id());
            pstmt.setInt(3, card.getPosition_id());
            pstmt.setString(4, card.getName());
            pstmt.setString(5, card.getEmail());
            pstmt.setString(6, card.getRemarks());
            pstmt.setBoolean(7, card.isFavorite());
            pstmt.setTimestamp(8, new Timestamp(System.currentTimeMillis())); // Set created_date
            pstmt.setTimestamp(9, new Timestamp(System.currentTimeMillis())); // Set update_date
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public Card getCardById(int cardId) {
        String sql = "SELECT * FROM card WHERE card_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Card card = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, cardId);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                card = new Card();
                card.setCard_id(rs.getInt("card_id"));
                card.setCompany_id(rs.getInt("company_id"));
                card.setDepartment_id(rs.getInt("department_id"));
                card.setPosition_id(rs.getInt("position_id"));
                card.setName(rs.getString("name"));
                card.setEmail(rs.getString("email"));
                card.setRemarks(rs.getString("remarks"));
                card.setFavorite(rs.getBoolean("favorite"));
                card.setCreated_date(rs.getTimestamp("created_date"));
                card.setUpdate_date(rs.getTimestamp("update_date"));
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return card;
    }

    public List<Card> getAllCards() {
        String sql = "SELECT * FROM card ORDER BY name"; // Ordered by name
        List<Card> cards = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Card card = new Card();
                card.setCard_id(rs.getInt("card_id"));
                card.setCompany_id(rs.getInt("company_id"));
                card.setDepartment_id(rs.getInt("department_id"));
                card.setPosition_id(rs.getInt("position_id"));
                card.setName(rs.getString("name"));
                card.setEmail(rs.getString("email"));
                card.setRemarks(rs.getString("remarks"));
                card.setFavorite(rs.getBoolean("favorite"));
                card.setCreated_date(rs.getTimestamp("created_date"));
                card.setUpdate_date(rs.getTimestamp("update_date"));
                cards.add(card);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return cards;
    }

    public List<Card> getFavoriteCards() {
        String sql = "SELECT * FROM card WHERE favorite = true ORDER BY name";
        List<Card> cards = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Card card = new Card();
                card.setCard_id(rs.getInt("card_id"));
                card.setCompany_id(rs.getInt("company_id"));
                card.setDepartment_id(rs.getInt("department_id"));
                card.setPosition_id(rs.getInt("position_id"));
                card.setName(rs.getString("name"));
                card.setEmail(rs.getString("email"));
                card.setRemarks(rs.getString("remarks"));
                card.setFavorite(rs.getBoolean("favorite"));
                card.setCreated_date(rs.getTimestamp("created_date"));
                card.setUpdate_date(rs.getTimestamp("update_date"));
                cards.add(card);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return cards;
    }
    
    public List<Card> getCardsByCompanyId(int companyId) {
        String sql = "SELECT * FROM card WHERE company_id = ? ORDER BY name";
        List<Card> cards = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, companyId);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Card card = new Card();
                card.setCard_id(rs.getInt("card_id"));
                card.setCompany_id(rs.getInt("company_id"));
                card.setDepartment_id(rs.getInt("department_id"));
                card.setPosition_id(rs.getInt("position_id"));
                card.setName(rs.getString("name"));
                card.setEmail(rs.getString("email"));
                card.setRemarks(rs.getString("remarks"));
                card.setFavorite(rs.getBoolean("favorite"));
                card.setCreated_date(rs.getTimestamp("created_date"));
                card.setUpdate_date(rs.getTimestamp("update_date"));
                cards.add(card);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return cards;
    }

    public void updateCard(Card card) {
        String sql = "UPDATE card SET company_id = ?, department_id = ?, position_id = ?, name = ?, email = ?, remarks = ?, favorite = ?, update_date = ? WHERE card_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, card.getCompany_id());
            pstmt.setInt(2, card.getDepartment_id());
            pstmt.setInt(3, card.getPosition_id());
            pstmt.setString(4, card.getName());
            pstmt.setString(5, card.getEmail());
            pstmt.setString(6, card.getRemarks());
            pstmt.setBoolean(7, card.isFavorite());
            pstmt.setTimestamp(8, new Timestamp(System.currentTimeMillis())); // Set update_date
            pstmt.setInt(9, card.getCard_id());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public void deleteCard(int cardId) {
        String sql = "DELETE FROM card WHERE card_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, cardId);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Handle exception properly
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
