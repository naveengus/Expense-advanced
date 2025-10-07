import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function Settings() {
  const [showCard, setShowCard] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDeleteAll = async () => {
    setError("");
    setSuccess("");

    if (!password || !confirmText) {
      setError("Please enter password and type DELETE to confirm");
      return;
    }

    if (confirmText !== "DELETE") {
      setError('You must type "DELETE" exactly');
      return;
    }

    try {
      await AxiosService.delete(ApiRoutes.DELETEALL.Path, {
        data: { password },
        authenticate: true,
      });

      setSuccess("All data deleted successfully!");
      setPassword("");
      setConfirmText("");
      setShowCard(false);

      // Auto-dismiss success after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting data");
    }
  };

  return (
    <Container className="mt-5">
      {/* Global Success/Error Alerts */}
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!showCard && (
        <Button variant="danger" onClick={() => setShowCard(true)}>
          Clear ALL Data
        </Button>
      )}

      {showCard && (
        <Card className="mt-3">
          <Card.Header className="bg-danger text-white">
            Settings - Delete All Data
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type "DELETE" to confirm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type DELETE"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </Form.Group>
              <Button variant="danger" onClick={handleDeleteAll}>
                Delete All Data
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => setShowCard(false)}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Settings;
