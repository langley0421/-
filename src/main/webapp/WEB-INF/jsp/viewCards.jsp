<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="${empty sessionScope.user}">
    <c:redirect url="${pageContext.request.contextPath}/login.jsp"/>
</c:if>

<html>
<head>
    <title>View Cards</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h2>Welcome, <c:out value="${sessionScope.user.email}"/>!</h2>
    <p>
        <a href="${pageContext.request.contextPath}/UserServlet?action=logout">Logout</a> |
        <a href="${pageContext.request.contextPath}/CardServlet?action=showAddForm">Add New Card</a>
    </p>

    <h3>Your Business Cards</h3>

    <c:if test="${not empty requestScope.errorMessage}">
        <p style="color:red;">${requestScope.errorMessage}</p>
    </c:if>

    <c:choose>
        <c:when test="${not empty requestScope.cards}">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company ID</th>
                        <th>Department ID</th>
                        <th>Position ID</th>
                        <th>Remarks</th>
                        <th>Favorite</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <!-- Note: Add actions like Edit/Delete here in a real app -->
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="card" items="${requestScope.cards}">
                        <tr>
                            <td><c:out value="${card.name}"/></td>
                            <td><c:out value="${card.email}"/></td>
                            <td>
                                <c:out value="${card.company_id}"/>
                                <!-- TODO: Display company_name. Requires DAO modification or service layer to fetch. -->
                            </td>
                            <td>
                                <c:out value="${card.department_id}"/>
                                <!-- TODO: Display department_name. Requires DAO modification or service layer to fetch. -->
                            </td>
                            <td>
                                <c:out value="${card.position_id}"/>
                                <!-- TODO: Display position_name. Requires DAO modification or service layer to fetch. -->
                            </td>
                            <td><c:out value="${card.remarks}"/></td>
                            <td><c:out value="${card.favorite ? 'Yes' : 'No'}"/></td>
                            <td><c:out value="${card.created_date}"/></td>
                            <td><c:out value="${card.update_date}"/></td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </c:when>
        <c:otherwise>
            <p>No cards found. <a href="${pageContext.request.contextPath}/CardServlet?action=showAddForm">Add one now!</a></p>
        </c:otherwise>
    </c:choose>

</body>
</html>
