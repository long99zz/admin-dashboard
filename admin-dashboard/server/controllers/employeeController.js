const Employee = require("../models/employeeModel");

// Create employee
exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Get employee
exports.getEmployeeDetails = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Get all employees
exports.getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    next(error);
  }
};

// Update employee
exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Delete employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Employee removed successfully",
    });
  } catch (error) {
    next(error);
  }
};
