import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

function AddClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    number: "",
    email: "",
    notes: "",
    totalAmount: "",
    givenAmount: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Auto-calculate balance if totalAmount or givenAmount changes
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosService.post(
        ApiRoutes.CREATECLIENT.Path,
        formData,
        { authenticate: true }
      );
      console.log(res)
      alert(res.message || "Client added successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.message || "Internal Server Error");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-60 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold text-primary">Add Client 🧾</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formClientName" className="mb-3">
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

                <Form.Group controlId="formProjectName" className="mb-3">
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

                <Form.Group controlId="formClientNumber" className="mb-3">
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

                <Form.Group controlId="formClientEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter client email"
                  />
                </Form.Group>

                <Form.Group controlId="formTotalAmount" className="mb-3">
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

                <Form.Group controlId="formGivenAmount" className="mb-3">
                  <Form.Label>Given Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="givenAmount"
                    value={formData.givenAmount}
                    onChange={handleChange}
                    placeholder="Enter received amount"
                  />
                </Form.Group>

                {/* <Form.Group controlId="formBalance" className="mb-3">
                  <Form.Label>Pending Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="balance"
                    value={formData.balance}
                    readOnly
                    placeholder="Pending amount will auto-calculate"
                  />
                </Form.Group> */}

                <Form.Group controlId="formStartDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEndDate" className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formNotes" className="mb-3">
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
                  Add Client
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddClient;
