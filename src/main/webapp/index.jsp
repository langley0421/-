<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  This index page now forwards directly to the CardServlet to display the list of cards.
  The CardServlet itself will handle authentication and redirect to login.jsp if necessary.
--%>
<jsp:forward page="CardServlet?action=list" />
