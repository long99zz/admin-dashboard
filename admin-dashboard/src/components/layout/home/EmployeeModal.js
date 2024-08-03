import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeModal = ({ show, handleClose, dataId, onEmployeeUpdated, onEmployeeDeleted }) => {
  const [employeeData, setEmployeeData] = useState({
    employeeName: '',
    address: '',
    age: '',
    department: '',
    employeeStatus: ''
  });

  useEffect(() => {
    if (dataId) {
      fetchEmployeeData(dataId)
        .then(data => {
          if (data && data.employee) {
            setEmployeeData(data.employee);
          } else {
            console.error("Invalid employee data:", data);
          }
        })
        .catch(error => console.error("Failed to fetch employee data:", error));
    }
  }, [dataId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await updateEmployeeData(dataId, employeeData);
      if (response.ok) {
        onEmployeeUpdated();
        handleClose();
      } else {
        console.error("Failed to update employee data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteEmployeeData(dataId);
      if (response.ok) {
        onEmployeeDeleted();
        handleClose();
      } else {
        console.error("Failed to delete employee data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employee data:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dataId ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="employeeName">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              name="employeeName"
              value={employeeData.employeeName || ''}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={employeeData.address || ''}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={employeeData.age || ''}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={employeeData.department || ''}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </Form.Group>
          <Form.Group controlId="employeeStatus">
            <Form.Label>Employee Status</Form.Label>
            <Form.Control
              type="text"
              name="employeeStatus"
              value={employeeData.employeeStatus || ''}
              onChange={handleChange}
              placeholder="Enter employee status"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {dataId && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const fetchEmployeeData = async (id) => {
  const response = await fetch(`/api/employees/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch employee data');
  }
};

const updateEmployeeData = async (id, data) => {
  const response = await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

const deleteEmployeeData = async (id) => {
  const response = await fetch(`/api/employees/${id}`, {
    method: 'DELETE',
  });
  return response;
};

export default EmployeeModal;
