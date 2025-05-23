<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="${empty sessionScope.user}">
    <c:redirect url="${pageContext.request.contextPath}/login.jsp"/>
</c:if>

<html>
<head>
    <title>Add New Card</title>
</head>
<body>
    <h2>Add New Business Card</h2>
    <p><a href="${pageContext.request.contextPath}/CardServlet?action=list">Back to Card List</a></p>

    <c:if test="${not empty requestScope.errorMessage}">
        <p style="color:red;">${requestScope.errorMessage}</p>
    </c:if>

    <form action="${pageContext.request.contextPath}/CardServlet" method="post">
        <input type="hidden" name="action" value="add">
        <p>
            Name: <input type="text" name="name" value="<c:out value="${requestScope.submittedName}"/>" required>
        </p>
        <p>
            Email: <input type="email" name="email" value="<c:out value="${requestScope.submittedEmail}"/>" required>
        </p>
        <p>
            Company:
            <select name="company_id" required>
                <option value="">-- Select Company --</option>
                <c:forEach var="company" items="${requestScope.companies}">
                    <option value="${company.company_id}" ${company.company_id == requestScope.submittedCompanyId ? 'selected' : ''}>
                        <c:out value="${company.company_name}"/>
                    </option>
                </c:forEach>
            </select>
        </p>
        <p>
            Department:
            <select name="department_id" required>
                <option value="">-- Select Department --</option>
                <c:forEach var="department" items="${requestScope.departments}">
                    <option value="${department.department_id}" ${department.department_id == requestScope.submittedDepartmentId ? 'selected' : ''}>
                        <c:out value="${department.department_name}"/>
                    </option>
                </c:forEach>
            </select>
        </p>
        <p>
            Position:
            <select name="position_id" required>
                <option value="">-- Select Position --</option>
                <c:forEach var="position" items="${requestScope.positions}">
                    <option value="${position.position_id}" ${position.position_id == requestScope.submittedPositionId ? 'selected' : ''}>
                        <c:out value="${position.position_name}"/>
                    </option>
                </c:forEach>
            </select>
        </p>
        <p>
            Remarks: <br>
            <textarea name="remarks" rows="4" cols="50"><c:out value="${requestScope.submittedRemarks}"/></textarea>
        </p>
        <p>
            Favorite: <input type="checkbox" name="favorite" ${requestScope.submittedFavorite ? 'checked' : ''}>
        </p>
        <p>
            <input type="submit" value="Add Card">
        </p>
    </form>

</body>
</html>
