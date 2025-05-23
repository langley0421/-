<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>

    <c:if test="${not empty requestScope.errorMessage}">
        <p style="color:red;">${requestScope.errorMessage}</p>
    </c:if>

    <form action="UserServlet" method="post">
        <input type="hidden" name="action" value="register">
        <p>
            Email: <input type="email" name="email" required>
        </p>
        <p>
            Password: <input type="password" name="password" required>
        </p>
        <p>
            <input type="submit" value="Register">
        </p>
    </form>

    <p>
        Already have an account? <a href="login.jsp">Login here</a>
    </p>
</body>
</html>
