import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate, useParams } from "react-router-dom";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    number: "",
    email: "",
    notes: "",
    totalAmount: "",
    givenAmount: "",
    balance: "",
    startDate: "",
    endDate: "",
  });

  // Fetch client details
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await AxiosService.get(
          ApiRoutes.GETCLIENTBYID.Path.replace(":id", id),
          { authenticate: true }
        );
        setFormData({
          ...res,
          startDate: res.startDate?.split("T")[0] || "",
          endDate: res.endDate?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error fetching client:", error);
        alert("Failed to fetch client data");
      }
    };
    if (id) fetchClient();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "totalAmount" || name === "givenAmount") {
      const total = parseFloat(
        name === "totalAmount" ? value : updatedData.totalAmount
      ) || 0;
      const given = parseFloat(
        name === "givenAmount" ? value : updatedData.givenAmount
      ) || 0;
      updatedData.balance = total - given;
    }

    setFormData(updatedData);
  };

  // Submit updated client
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosService.put(
        ApiRoutes.UPDATECLIENT.Path.replace(":id", id),
        formData,
        { authenticate: true }
      );
      alert("Client updated successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error updating client:", error);
      alert(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-60 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold text-primary">Edit Client ✏️</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Client Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Enter client contact number"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter client email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    placeholder="Enter total project amount"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Given Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="givenAmount"
                    value={formData.givenAmount}
                    onChange={handleChange}
                    placeholder="Enter received amount"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter project details"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 rounded-pill">
                  Update Client
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditClient;
