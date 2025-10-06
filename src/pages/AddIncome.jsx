import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function AddIncome() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "",
    projectName: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await AxiosService.get(ApiRoutes.GETCLIENT.Path, { authenticate: true });
        setClients(res || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        alert("Error fetching clients");
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosService.post(ApiRoutes.INCOMECERATE.Path, formData, { authenticate: true });
      console.log(res)
      alert(res.message || "Income added successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.message || "Internal Server Error");
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Add Income Form */}
        <Col xs={12} md={5}>
          <Card className="shadow-lg border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold text-primary">Add Income 💰</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAmount" className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formClient" className="mb-3">
                  <Form.Label>Client</Form.Label>
                  <Form.Select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select client</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.clientName} - {client.projectName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCategory" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                  />
                </Form.Group>

                <Form.Group controlId="formNotes" className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter any notes"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 rounded-pill">
                  Add Income
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Client Table */}
        <Col xs={12} md={7}>
          <Card className="shadow-lg border-0 rounded-4 mb-4">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold text-primary">Clients Overview 🗂️</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Total Amount</th>
                    <th>Given Amount</th>
                    <th>Pending Balance</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <td>{client.clientName}</td>
                      <td>{client.projectName}</td>
                      <td>{client.totalAmount}</td>
                      <td>{client.givenAmount}</td>
                      <td>{client.balance}</td>
                      <td>{new Date(client.startDate).toLocaleDateString()}</td>
                      <td>{new Date(client.endDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No clients found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddIncome;
