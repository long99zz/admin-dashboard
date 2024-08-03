import React, { useState } from 'react';
import { usePagination, Pagination } from "pagination-react-js";
import { CiRead } from "react-icons/ci";
import EmployeeModal from "./EmployeeModal"; // Kiểm tra đường dẫn đúng

const TableBox = ({ tableData }) => {
    const [dataId, setDataId] = useState(null); // employee ID
    const { currentPage, entriesPerPage, entries } = usePagination(1, 10); // pagination
    const [showModal, setShowModal] = useState(false);

    const handleRowClick = (e) => {
        setDataId(e.currentTarget.getAttribute('data-id'));
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDataId(null);
    };

    return (
        <div className='descriptive-tb'>
            <EmployeeModal show={showModal} handleClose={handleCloseModal} dataId={dataId} />
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Employee Name</td>
                        <td>Address</td>
                        <td>Age</td>
                        <td>Department</td>
                        <td>Employee Status</td>
                        <td>Added</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.slice(entries.indexOfFirst, entries.indexOfLast).map((data) => (
                            <tr key={data._id} data-id={data._id} className='table-row' style={{ cursor: "pointer" }} onClick={handleRowClick}>
                                <td>{data._id}</td>
                                <td>{data.employeeName}</td>
                                <td>{data.address}</td>
                                <td>{data.age ? data.age : <strong>N/A</strong>}</td>
                                <td>{data.department ? data.department : <strong>N/A</strong>}</td>
                                <td>{data.employeeStatus ? data.employeeStatus : <strong>N/A</strong>}</td>
                                <td>{data.createdAt ? data.createdAt.split('T')[0] : <strong>N/A</strong>}</td>
                                <td className='action-icon pr-center'>
                                    <a href='http://localhost:3000'><CiRead /></a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={9}>
                            <Pagination
                                entriesPerPage={entriesPerPage.get}
                                totalEntries={tableData.length}
                                currentPage={{ get: currentPage.get, set: currentPage.set }}
                                offset={3}
                                classNames={{
                                    wrapper: "pagination m-auto pr-center",
                                    item: "pagination-item",
                                    itemActive: "pagination-item-active",
                                    navPrev: "pagination-item nav-item",
                                    navNext: "pagination-item nav-item",
                                    navStart: "pagination-item nav-item",
                                    navEnd: "pagination-item nav-item",
                                    navPrevCustom: "pagination-item",
                                    navNextCustom: "pagination-item"
                                }}
                                showFirstNumberAlways={true}
                                showLastNumberAlways={true}
                                navStart="&#171;"
                                navEnd="&#187;"
                                navPrev="Prev"
                                navNext="Next"
                                navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
                                navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TableBox;
