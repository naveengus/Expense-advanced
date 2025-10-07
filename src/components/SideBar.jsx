import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { logout } from "../utils/LogOut";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogout(false);
  };

  return (
    <div
      className="d-flex flex-column  text-black vh-100 p-3"
      style={{ width: "250px", position: "fixed",    background: "linear-gradient(180deg, #ff7409 0%, #ff9f43 90%)"
 }}
    >
      <div className="text-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="rounded-circle mb-2"
          width="80"
          height="80"
        />
        <h5 className="fw-bold">Naveen</h5>
      </div>
<Nav className="flex-column gap-2">
  <Nav.Link href="/Dashboard" style={{ color: "#000" }}>Dashboard</Nav.Link>
  <Nav.Link href="/AddClient" style={{ color: "#000" }}>Add Client</Nav.Link>
  <Nav.Link href="/AddEmploye" style={{ color: "#000" }}>Add Employers</Nav.Link>
  <Nav.Link href="/AddIncome" style={{ color: "#000" }}>Add Income</Nav.Link>
  <Nav.Link href="/AddExpence" style={{ color: "#000" }}>Add Expense</Nav.Link>
  <Nav.Link href="/Transition" style={{ color: "#000" }}>Transaction</Nav.Link>
  <Nav.Link href="/Categories" style={{ color: "#000" }}>Categories</Nav.Link>
  <Nav.Link href="#" style={{ color: "#000" }} onClick={() => navigate("/Settings")}>
    Settings
  </Nav.Link>
  <hr style={{ borderColor: "#000" }} />
  <Nav.Link href="#" style={{ color: "#000" }} onClick={() => setShowLogout(true)}>
    Logout
  </Nav.Link>
</Nav>


      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogout(false)}>No</Button>
          <Button variant="danger" onClick={handleLogout}>Yes, Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SideBar;
