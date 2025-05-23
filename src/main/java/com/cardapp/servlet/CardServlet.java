package com.cardapp.servlet;

import com.cardapp.dao.CardDAO;
import com.cardapp.dao.CompanyDAO;
import com.cardapp.dao.DepartmentDAO;
import com.cardapp.dao.PositionDAO;
import com.cardapp.model.Card;
import com.cardapp.model.Company;
import com.cardapp.model.Department;
import com.cardapp.model.Position;
import com.cardapp.model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp; // Not strictly needed here as DAO handles it
import java.util.List;

public class CardServlet extends HttpServlet {
    private CardDAO cardDAO;
    private CompanyDAO companyDAO;
    private DepartmentDAO departmentDAO;
    private PositionDAO positionDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        cardDAO = new CardDAO();
        companyDAO = new CompanyDAO();
        departmentDAO = new DepartmentDAO();
        positionDAO = new PositionDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp"); // Redirect to login if not authenticated
            return;
        }

        String action = request.getParameter("action");
        if (action == null || action.isEmpty()) {
            action = "list"; // Default action
        }

        // In a real application, add more robust error handling and access control.
        try {
            switch (action) {
                case "list":
                    List<Card> cards = cardDAO.getAllCards();
                    request.setAttribute("cards", cards);
                    request.getRequestDispatcher("WEB-INF/jsp/viewCards.jsp").forward(request, response);
                    break;
                case "showAddForm":
                    List<Company> companies = companyDAO.getAllCompanies();
                    List<Department> departments = departmentDAO.getAllDepartments();
                    List<Position> positions = positionDAO.getAllPositions();
                    request.setAttribute("companies", companies);
                    request.setAttribute("departments", departments);
                    request.setAttribute("positions", positions);
                    request.getRequestDispatcher("WEB-INF/jsp/addCard.jsp").forward(request, response);
                    break;
                // Add cases for "edit", "delete", "view" as needed
                default:
                    response.sendRedirect("CardServlet?action=list"); // Default to list
                    break;
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // Set an error message
            request.setAttribute("errorMessage", "An unexpected error occurred: " + e.getMessage());
            // Forward to a generic error page or back to the list with an error
            request.getRequestDispatcher("WEB-INF/jsp/error.jsp").forward(request, response); // Assuming a generic error.jsp
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp"); // Redirect to login if not authenticated
            return;
        }

        String action = request.getParameter("action");

        // Input validation and error handling are crucial in a real application.
        // E.g., check for nulls, parse integers safely, validate email formats.
        try {
            if ("add".equals(action)) {
                String name = request.getParameter("name");
                String email = request.getParameter("email");
                String remarks = request.getParameter("remarks");
                boolean favorite = "on".equalsIgnoreCase(request.getParameter("favorite")) || "true".equalsIgnoreCase(request.getParameter("favorite"));

                // Basic validation example (should be more comprehensive)
                if (name == null || name.trim().isEmpty() || email == null || email.trim().isEmpty()) {
                     request.setAttribute("errorMessage", "Name and Email are required.");
                     // Forward back to form with data to repopulate
                     List<Company> companies = companyDAO.getAllCompanies();
                     List<Department> departments = departmentDAO.getAllDepartments();
                     List<Position> positions = positionDAO.getAllPositions();
                     request.setAttribute("companies", companies);
                     request.setAttribute("departments", departments);
                     request.setAttribute("positions", positions);
                     // Repopulate submitted values
                     request.setAttribute("submittedName", name);
                     request.setAttribute("submittedEmail", email);
                     request.setAttribute("submittedRemarks", remarks);
                     // ... and so on for other fields
                     request.getRequestDispatcher("WEB-INF/jsp/addCard.jsp").forward(request, response);
                     return;
                }

                Card card = new Card();
                card.setName(name);
                card.setEmail(email);
                card.setRemarks(remarks);
                card.setFavorite(favorite);

                try {
                    card.setCompany_id(Integer.parseInt(request.getParameter("company_id")));
                    card.setDepartment_id(Integer.parseInt(request.getParameter("department_id")));
                    card.setPosition_id(Integer.parseInt(request.getParameter("position_id")));
                } catch (NumberFormatException e) {
                    request.setAttribute("errorMessage", "Invalid ID format for company, department, or position.");
                    // Forward back to form, repopulating data
                    List<Company> companies = companyDAO.getAllCompanies();
                    List<Department> departments = departmentDAO.getAllDepartments();
                    List<Position> positions = positionDAO.getAllPositions();
                    request.setAttribute("companies", companies);
                    request.setAttribute("departments", departments);
                    request.setAttribute("positions", positions);
                    request.setAttribute("submittedName", name);
                    request.setAttribute("submittedEmail", email);
                    // ... etc.
                    request.getRequestDispatcher("WEB-INF/jsp/addCard.jsp").forward(request, response);
                    return;
                }

                // created_date and update_date are set by DAO
                cardDAO.addCard(card);
                response.sendRedirect("CardServlet?action=list");
            } else {
                // Handle other POST actions like "update", "delete"
                response.sendRedirect("CardServlet?action=list");
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // Set an error message
            request.setAttribute("errorMessage", "An unexpected error occurred while processing your request: " + e.getMessage());
            // Forward to a generic error page or back to the form
            request.getRequestDispatcher("WEB-INF/jsp/error.jsp").forward(request, response);
        }
    }
}
