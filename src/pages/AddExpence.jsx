import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function AddExpence() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await AxiosService.get(ApiRoutes.GETCLIENT.Path, {
          authenticate: true,
        });
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
      const res = await AxiosService.post(
        ApiRoutes.EXPENSECREATE.Path,
        formData,
        { authenticate: true }
      );
      alert(res.message || "Expense added successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Internal Server Error");
    }
  };

  // Filter projects for selected client
  const projectsForClient = clients
    .filter((c) => c.clientName === formData.clientName)
    .map((c) => c.projectName);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start bg-light py-5"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold text-primary">
                Add Expense 💸
              </h3>

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

                <Form.Group controlId="formClientName" className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Select
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select client</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client.clientName}>
                        {client.clientName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formProjectName" className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Select
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select project</option>
                    {clients
                      // .filter((c) => c.clientName === formData.clientName)
                      .map((client) => (
                        <option key={client._id} value={client.projectName}>
                          {client.projectName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formCategory" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Salary">Salary</option>
                    <option value="Domain">Domain</option>
                    <option value="Miscellaneous">Miscellaneous</option>
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

                <Form.Group controlId="formNotes" className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter notes"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-pill"
                >
                  Add Expense
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddExpence;
