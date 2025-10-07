import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [employes, setEmployes] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch Clients
  const getClientsData = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETCLIENT.Path, { authenticate: true });
      const sortedClients = res.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      setClients(sortedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      alert("Error fetching clients");
    }
  };

  // 🔹 Fetch Expenses
  const getExpensesData = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, { authenticate: true });
      setExpenses(res);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("Error fetching expenses");
    }
  };

  // 🔹 Fetch Income
  const getIncomeData = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETINCOME.Path, { authenticate: true });
      setIncome(res);
    } catch (error) {
      console.error("Error fetching income:", error);
      alert("Error fetching income");
    }
  };

  // 🔹 Fetch Employes
  const getEmployesData = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETEMPLOYES.Path, { authenticate: true });
      setEmployes(res);
    } catch (error) {
      console.error("Error fetching employes:", error);
      alert("Error fetching employes");
    }
  };

  useEffect(() => {
    getClientsData();
    getExpensesData();
    getIncomeData();
    getEmployesData();
  }, []);

  // 🔹 Edit / Delete
  const handleEdit = (id) => navigate(`/EditClient/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await AxiosService.delete(`${ApiRoutes.DELETECLIENT.Path}/${id}`, { authenticate: true });
      alert("Client deleted successfully");
      getClientsData();
    } catch (error) {
      console.error("Error deleting client:", error);
      alert(error.response?.data?.message || "Error deleting client");
    }
  };

  // 🔹 Calculations
  const totalAmount = clients.reduce((sum, c) => sum + Number(c.totalAmount || 0), 0);
  const totalReceived = clients.reduce((sum, c) => sum + Number(c.givenAmount || 0), 0);
  const totalPending = clients.reduce((sum, c) => sum + Number(c.balance || 0), 0);
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      {/* 🌟 Top Row: Summary */}
      <Row className="mb-4">
        <Col xs={12} md={3} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-success text-white">
            <Card.Body>
              <Card.Title>Total Amount</Card.Title>
              <Card.Text>₹ {totalAmount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-info text-white">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <Card.Text>₹ {totalIncome}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-danger text-white">
            <Card.Body>
              <Card.Title>Total Expense</Card.Title>
              <Card.Text>₹ {totalExpense}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3} className="mb-3">
          <Card className="text-center shadow-sm border-0 bg-primary text-white">
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <Card.Text>₹ {balance}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 👥 Second Row: Client / Employer Summary */}
      <Row className="mb-4">
        <Col xs={6} md={3} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <Card.Text>{clients.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Employers</Card.Title>
              <Card.Text>{employes.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Received</Card.Title>
              <Card.Text>₹ {totalReceived}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Pending</Card.Title>
              <Card.Text>₹ {totalPending}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 📋 Clients Table */}
      <h5  className="text-center mb-4 fw-bold"
  style={{
    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>Clients Overview</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Project</th>
            <th>Email</th>
            <th>Number</th>
            <th>Total Amount</th>
            <th>Given Amount</th>
            <th>Balance</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td>{index + 1}</td>
              <td>{client.clientName}</td>
              <td>{client.projectName}</td>
              <td>{client.email}</td>
              <td>{client.number}</td>
              <td>₹ {client.totalAmount}</td>
              <td>₹ {client.givenAmount}</td>
              <td>₹ {client.balance}</td>
              <td>{new Date(client.startDate).toLocaleDateString()}</td>
              <td>{new Date(client.endDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(client._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Dashboard;
