import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function Dashboard() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const getClientsData = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETCLIENT.Path, {
        authenticate: true,
      });
      const sortedClients = res.sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate)
      );
      console.log(sortedClients)
      setClients(sortedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      alert("Error fetching clients");
    }
  };

  useEffect(() => {
    getClientsData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-client/${id}`); // navigate to edit page
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await AxiosService.delete(`${ApiRoutes.DELETECLIENT.Path}/${id}`, {
        authenticate: true,
      });
      alert("Client deleted successfully");
      getClientsData(); // refresh list
    } catch (error) {
      console.error("Error deleting client:", error);
      alert(error.response?.data?.message || "Error deleting client");
    }
  };

  return (
    <>
      {/* Summary Cards */}
      <Row className="mb-4">
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <Card.Text>{clients.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Projects</Card.Title>
              <Card.Text>{clients.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Received</Card.Title>
              <Card.Text>
                ₹ {clients.reduce((sum, client) => sum + client.givenAmount, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Pending</Card.Title>
              <Card.Text>
                ₹ {clients.reduce((sum, client) => sum + client.balance, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Clients Table */}
      <h5 className="mb-3">Clients Overview</h5>
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
