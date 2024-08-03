// src/components/AddEmployeeModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { MAIN_URI } from '../../helper';
import './AddEmployeeModal.css'; // Đảm bảo bạn đã tạo file CSS để style modal

const AddEmployeeModal = ({ show, onClose, onAdd }) => {
    const [newEmployee, setNewEmployee] = useState({
        employeeName: '',
        address: '',
        age: '',
        department: '',
        employeeStatus: ''
    });

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${MAIN_URI}/api/v1/create`, newEmployee);
            onAdd(); // Cập nhật dữ liệu khi thêm nhân viên thành công
            onClose(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    if (!show) return null;

    return (
        <div className="add-employee-modal" onClick={onClose}>
            <div className="add-employee-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="employeeName" value={newEmployee.employeeName} onChange={handleChange} required />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={newEmployee.address} onChange={handleChange} required />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={newEmployee.age} onChange={handleChange} required />
                    </label>
                    <label>
                        Department:
                        <input type="text" name="department" value={newEmployee.department} onChange={handleChange} required />
                    </label>
                    <label>
                        Status:
                        <input type="text" name="employeeStatus" value={newEmployee.employeeStatus} onChange={handleChange} required />
                    </label>
                    <button type="submit">Add Employee</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
