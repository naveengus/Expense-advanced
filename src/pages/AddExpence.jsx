import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function AddExpense() {
  const [toggleType, setToggleType] = useState("client"); // "client" or "employee"
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    employeName: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  // Fetch clients and employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await AxiosService.get(ApiRoutes.GETCLIENT.Path, { authenticate: true });
        setClients(clientsRes || []);
        const empRes = await AxiosService.get(ApiRoutes.GETEMPLOYES.Path, { authenticate: true });
        setEmployees(empRes || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosService.post(ApiRoutes.EXPENSECREATE.Path, formData, { authenticate: true });
      alert("Expense added successfully");
      setFormData({
        clientName: "",
        projectName: "",
        employeName: "",
        amount: "",
        date: "",
        category: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-lg rounded-4">
            <Card.Body className="p-4">
              <h3  className="text-center mb-4 fw-bold"
  style={{
    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>
                Add Expense 💸
              </h3>

              {/* Toggle between Client / Employee */}
              <Form.Group className="mb-4">
                <Form.Check
                  inline
                  label="Client Expense"
                  name="toggleType"
                  type="radio"
                  checked={toggleType === "client"}
                  onChange={() => setToggleType("client")}
                />
                <Form.Check
                  inline
                  label="Employee Expense"
                  name="toggleType"
                  type="radio"
                  checked={toggleType === "employee"}
                  onChange={() => setToggleType("employee")}
                />
              </Form.Group>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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

                {toggleType === "client" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Client Name</Form.Label>
                      <Form.Select
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select client</option>
                        {clients.map((c) => (
                          <option key={c._id} value={c.clientName}>
                            {c.clientName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Select
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        disabled={!formData.clientName}
                        required
                      >
                        <option value="">Select project</option>
                        {clients
                          .filter((c) => c.clientName === formData.clientName)
                          .map((c) => (
                            <option key={c._id} value={c.projectName}>
                              {c.projectName}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                )}

                {toggleType === "employee" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Select
                      name="employeName"
                      value={formData.employeName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select employee</option>
                      {employees.map((e) => (
                        <option key={e._id} value={e.EmployeName}>
                          {e.EmployeName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
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

                <Button type="submit" className="w-100 rounded-pill" variant="primary">
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

export default AddExpense;
