import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function Transition() {
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [view, setView] = useState("income");

  const getData = async () => {
    try {
      const resIncome = await AxiosService.get(ApiRoutes.GETINCOME.Path, { authenticate: true });
      setIncome(resIncome);

      const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, { authenticate: true });
      setExpense(resExpense);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const incomeWithType = income.map((inc) => ({ ...inc, type: "income" }));
  const expenseWithType = expense.map((exp) => ({ ...exp, type: "expense" }));
  const combined = [...incomeWithType, ...expenseWithType].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filtered = combined.filter((item) => item.date.slice(0, 7) === selectedMonth);

  const monthIncome = filtered
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthExpense = filtered
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const displayed = filtered.filter((item) => item.type === view);

  // Delete handler
  const handleDelete = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        if (type === "income") {
          await AxiosService.delete(`${ApiRoutes.DELETEINCOME.Path}/${id}`, { authenticate: true });
        } else {
          await AxiosService.delete(`${ApiRoutes.DELETEEXPENSE.Path}/${id}`, { authenticate: true });
        }
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        getData();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Internal Server Error");
      }
    }
  };

  return (
    <Container className="py-4">
      <h2  className="text-center mb-4 fw-bold"
  style={{
    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>Transactions</h2>

      {/* Totals */}
      <Row className="mb-3">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Income</Card.Title>
              <Card.Text className="text-success">{monthIncome}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Expense</Card.Title>
              <Card.Text className="text-danger">{monthExpense}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <Card.Text className="text-primary">{monthIncome - monthExpense}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Month Filter & Toggle Buttons */}
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-control"
          />
        </Col>
        <Col md={8} className="text-end">
          <Button
            variant={view === "income" ? "success" : "secondary"}
            className="me-2"
            onClick={() => setView("income")}
          >
            Income
          </Button>
          <Button
            variant={view === "expense" ? "danger" : "secondary"}
            onClick={() => setView("expense")}
          >
            Expense
          </Button>
        </Col>
      </Row>

      {/* Transactions Table */}
      {displayed.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Client</th>
              <th>Project</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                <td>{item.clientName || "-"}</td>
                <td>{item.projectName || "-"}</td>
                <td>{item.category || "-"}</td>
                <td className={item.type === "income" ? "text-success" : "text-danger"}>
                  {item.amount}
                </td>
                <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                <td>{item.notes || "-"}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item._id, item.type)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No {view} transactions for this month.</p>
      )}
    </Container>
  );
}

export default Transition;
