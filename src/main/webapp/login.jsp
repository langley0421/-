<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>

    <c:if test="${not empty requestScope.errorMessage}">
        <p style="color:red;">${requestScope.errorMessage}</p>
    </c:if>
    <c:if test="${not empty sessionScope.successMessage}">
        <p style="color:green;">${sessionScope.successMessage}</p>
        <% session.removeAttribute("successMessage"); %>
    </c:if>
     <c:if test="${not empty param.successMessage}">
        <p style="color:green;">${param.successMessage}</p>
    </c:if>


    <form action="UserServlet" method="post">
        <input type="hidden" name="action" value="login">
        <p>
            Email: <input type="email" name="email" required>
        </p>
        <p>
            Password: <input type="password" name="password" required>
        </p>
        <p>
            <input type="submit" value="Login">
        </p>
    </form>

    <p>
        Don't have an account? <a href="register.jsp">Register here</a>
    </p>
</body>
</html>
