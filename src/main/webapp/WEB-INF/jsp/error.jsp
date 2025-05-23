<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h2>An Unexpected Error Occurred</h2>

    <c:if test="${not empty requestScope.errorMessage}">
        <p style="color:red;"><strong>Error Details:</strong> <c:out value="${requestScope.errorMessage}"/></p>
    </c:if>

    <p>We apologize for the inconvenience. Please try again later.</p>

    <p>
        <a href="${pageContext.request.contextPath}/CardServlet?action=list">Go to Card List</a> |
        <a href="${pageContext.request.contextPath}/login.jsp">Go to Login Page</a>
    </p>
</body>
</html>
