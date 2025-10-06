import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Table } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#FF6384"];

function Categories() {
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const getData = async () => {
    try {
      const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, {
        authenticate: true,
      });
      setExpense(resExpense);

      const filtered = resExpense.filter((item) => item.date.slice(0, 7) === selectedMonth);
      const total = filtered.reduce((sum, item) => sum + Number(item.amount), 0);
      setTotalExpense(total);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth]);

  // Group expenses by category
  const filtered = expense.filter((item) => item.date.slice(0, 7) === selectedMonth);
  const categoryTotals = {};
  filtered.forEach((item) => {
    const amt = Number(item.amount);
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += amt;
    } else {
      categoryTotals[item.category] = amt;
    }
  });

  const chartData = Object.entries(categoryTotals).map(([category, amt]) => ({
    name: category,
    value: Number(((amt / totalExpense) * 100).toFixed(1)),
  }));

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Expense Categories</h2>

      {/* Month Filter */}
      <Row className="justify-content-center mb-3">
        <Col md={4}>
          <Form.Control
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </Col>
      </Row>

      {/* Pie Chart */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <PieChart width={350} height={250}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Category Details */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              {filtered.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered
                      .map((item) => ({
                        ...item,
                        percent: ((item.amount / totalExpense) * 100).toFixed(1),
                      }))
                      .sort((a, b) => b.percent - a.percent)
                      .map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.category}</td>
                          <td>{item.amount}</td>
                          <td>{item.percent}%</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">No expenses for this month</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Categories;
