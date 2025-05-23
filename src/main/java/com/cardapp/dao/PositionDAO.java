package com.cardapp.dao;

import com.cardapp.model.Position;
import com.cardapp.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PositionDAO {

    public void addPosition(Position position) {
        String sql = "INSERT INTO position (position_name) VALUES (?)";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, position.getPosition_name());
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

    public Position getPositionById(int positionId) {
        String sql = "SELECT position_id, position_name FROM position WHERE position_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Position position = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, positionId);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                position = new Position();
                position.setPosition_id(rs.getInt("position_id"));
                position.setPosition_name(rs.getString("position_name"));
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
        return position;
    }

    public List<Position> getAllPositions() {
        String sql = "SELECT position_id, position_name FROM position ORDER BY position_name";
        List<Position> positions = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Position position = new Position();
                position.setPosition_id(rs.getInt("position_id"));
                position.setPosition_name(rs.getString("position_name"));
                positions.add(position);
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
        return positions;
    }

    public void updatePosition(Position position) {
        String sql = "UPDATE position SET position_name = ? WHERE position_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, position.getPosition_name());
            pstmt.setInt(2, position.getPosition_id());
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

    public void deletePosition(int positionId) {
        String sql = "DELETE FROM position WHERE position_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, positionId);
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
