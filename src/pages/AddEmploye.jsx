import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function EmployeManager() {
  const [formData, setFormData] = useState({
    EmployeName: "",
    email: "",
    number: "",
    notes: "",
  });
  const [employes, setEmployes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all employes
  const fetchEmployes = async () => {
    try {
      const res = await AxiosService.get(ApiRoutes.GETEMPLOYES.Path, { authenticate: true });
      setEmployes(res);
    } catch (error) {
      console.error(error);
      alert("Error fetching employes");
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update employe
        await AxiosService.put(
          ApiRoutes.UPDATEEMPLOYE.Path.replace(":id", editingId),
          formData,
          { authenticate: true }
        );
        alert("Employe updated successfully");
      } else {
        // Add employe
        await AxiosService.post(ApiRoutes.CREATEEMPLOYE.Path, formData, { authenticate: true });
        alert("Employe added successfully");
      }
      setFormData({ EmployeName: "", email: "", number: "", notes: "" });
      setEditingId(null);
      fetchEmployes();
    } catch (error) {
      console.error(error);
      alert(error.response?.message || "Internal Server Error");
    }
  };

  // Handle edit click
  const handleEdit = (emp) => {
    setFormData({
      EmployeName: emp.EmployeName,
      email: emp.email,
      number: emp.number,
      notes: emp.notes || "",
    });
    setEditingId(emp._id);
  };

  // Handle delete click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employe?")) {
      try {
        await AxiosService.delete(ApiRoutes.DELETEEMPLOYE.Path.replace(":id", id), { authenticate: true });
        alert("Employe deleted successfully");
        fetchEmployes();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Internal Server Error");
      }
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Add/Edit Form */}
        <Col md={4}>
          <Card className="shadow-lg border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
              <h3  className="text-center mb-4 fw-bold"
  style={{
    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>
                {editingId ? "Edit Employe ✏️" : "Add Employe 👨‍💼"}
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Employe Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeName"
                    value={formData.EmployeName}
                    onChange={handleChange}
                    placeholder="Enter employe name"
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
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Additional notes"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 rounded-pill">
                  {editingId ? "Update Employe" : "Add Employe"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Employes Table */}
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body>
              <h3  className="text-center mb-4 fw-bold"
  style={{
    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>Employes List</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employes.length > 0 ? (
                    employes.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.EmployeName}</td>
                        <td>{emp.email}</td>
                        <td>{emp.number}</td>
                        <td>{emp.notes}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(emp)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(emp._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No employes found
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

export default EmployeManager;
