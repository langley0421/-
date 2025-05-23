package com.cardapp.dao;

import com.cardapp.model.Company;
import com.cardapp.util.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CompanyDAO {

    public void addCompany(Company company) {
        String sql = "INSERT INTO company (company_name, zipcode, address, phone) VALUES (?, ?, ?, ?)";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, company.getCompany_name());
            pstmt.setString(2, company.getZipcode());
            pstmt.setString(3, company.getAddress());
            pstmt.setString(4, company.getPhone());
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

    public Company getCompanyById(int companyId) {
        String sql = "SELECT company_id, company_name, zipcode, address, phone FROM company WHERE company_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Company company = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, companyId);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                company = new Company();
                company.setCompany_id(rs.getInt("company_id"));
                company.setCompany_name(rs.getString("company_name"));
                company.setZipcode(rs.getString("zipcode"));
                company.setAddress(rs.getString("address"));
                company.setPhone(rs.getString("phone"));
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
        return company;
    }

    public List<Company> getAllCompanies() {
        String sql = "SELECT company_id, company_name, zipcode, address, phone FROM company ORDER BY company_name";
        List<Company> companies = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Company company = new Company();
                company.setCompany_id(rs.getInt("company_id"));
                company.setCompany_name(rs.getString("company_name"));
                company.setZipcode(rs.getString("zipcode"));
                company.setAddress(rs.getString("address"));
                company.setPhone(rs.getString("phone"));
                companies.add(company);
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
        return companies;
    }

    public void updateCompany(Company company) {
        String sql = "UPDATE company SET company_name = ?, zipcode = ?, address = ?, phone = ? WHERE company_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, company.getCompany_name());
            pstmt.setString(2, company.getZipcode());
            pstmt.setString(3, company.getAddress());
            pstmt.setString(4, company.getPhone());
            pstmt.setInt(5, company.getCompany_id());
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

    public void deleteCompany(int companyId) {
        String sql = "DELETE FROM company WHERE company_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, companyId);
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
