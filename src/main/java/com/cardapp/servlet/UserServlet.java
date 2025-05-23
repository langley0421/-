package com.cardapp.servlet;

import com.cardapp.dao.UserDAO;
import com.cardapp.model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class UserServlet extends HttpServlet {
    private UserDAO userDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        userDAO = new UserDAO();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        // In a real application, implement robust input validation and error handling.
        // Consider using a validation framework.
        if ("register".equals(action)) {
            String email = request.getParameter("email");
            String password = request.getParameter("password"); // Plain text, hash in real app

            // Basic validation example (should be more comprehensive)
            if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
                request.setAttribute("errorMessage", "Email and password cannot be empty.");
                request.getRequestDispatcher("register.jsp").forward(request, response); // Assuming a register.jsp
                return;
            }

            User user = new User();
            user.setEmail(email);
            user.setPassword(password); // Remember: HASH PASSWORDS in a real application!

            userDAO.addUser(user);

            // Set a success message for the login page
            HttpSession session = request.getSession();
            session.setAttribute("successMessage", "Registration successful. Please login.");
            response.sendRedirect("login.jsp");

        } else if ("login".equals(action)) {
            String email = request.getParameter("email");
            String password = request.getParameter("password");

            if (userDAO.isValidUser(email, password)) {
                User user = userDAO.getUserByEmail(email);
                HttpSession session = request.getSession();
                session.setAttribute("user", user); // Store user object in session
                response.sendRedirect("CardServlet?action=list"); // Redirect to card list or dashboard
            } else {
                request.setAttribute("errorMessage", "Invalid email or password.");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            }
        } else {
            // Handle unknown action or redirect to an error page
            response.sendRedirect("login.jsp"); // Default redirect if action is unknown
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("logout".equals(action)) {
            HttpSession session = request.getSession(false); // Get session, don't create if it doesn't exist
            if (session != null) {
                session.invalidate();
            }
            response.sendRedirect("login.jsp");
        } else {
            // Handle other GET actions or redirect to login if not logged out
            response.sendRedirect("login.jsp");
        }
    }
}
