import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { logout } from "../utils/LogOut";

function SideBar() {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    setShow(false);
  };

  return (
    <div
      className="d-flex flex-column bg-primary text-white vh-100 p-3"
      style={{ width: "250px", position: "fixed" }}
    >
      {/* Profile Section */}
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

      {/* Navigation Links */}
      <Nav className="flex-column gap-2">
        <Nav.Link href="/Dashboard" className="text-white">
          Dashboard
        </Nav.Link>
        <Nav.Link href="/AddClient" className="text-white">
          Add Client
        </Nav.Link>
        <Nav.Link href="/AddIncome" className="text-white">
          Add Income
        </Nav.Link>
        <Nav.Link href="/AddExpence" className="text-white">
          Add Expense
        </Nav.Link>
        <Nav.Link href="/Transition" className="text-white">
          Transaction
        </Nav.Link>
        <Nav.Link href="/Categories" className="text-white">
          Categories
        </Nav.Link>
        <Nav.Link href="#" className="text-white">
          Settings
        </Nav.Link>
        <hr className="text-light" />
        <Nav.Link href="#" className="text-white" onClick={() => setShow(true)}>
          Logout
        </Nav.Link>
      </Nav>

      {/* React Bootstrap Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SideBar;
