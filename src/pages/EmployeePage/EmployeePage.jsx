import React, { useEffect, useState } from "react";
import AddEmployeeModal from "../../components/EmployeePage/AddEmployeeModal/AddEmployessModal";
import { Dropdown, Menu, Modal, Space, Spin, Table } from "antd";
import { FaCheck, FaEllipsisVertical, FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ViewEmployeeModal from "../../components/EmployeePage/ViewEmployeeModal/ViewEmployeeModal";
import EmployeeBalanceModal from "../../components/EmployeePage/EmployeeBalanceModal/EmployeeBalanceModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployees, fetchEmployees } from "../../features/employeesSlice";
import { toast } from "react-toastify";
import { formattedDate } from "../../../utils/formattedDate";
import EditEmployeeModal from "../../components/EmployeePage/EditEmployeeModal/EditEmployeeModal";

export default function EmployeePage() {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal , setEditModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [employeeBalanceModal, setEmployeeBalanceModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { employees, loading, deleteLoading } = useSelector(
    (state) => state?.employees
  );
  const columns = [
    {
      dataIndex: "admin_id",
      key: "admin_id",
      title: "#",
    },
    {
      dataIndex: "identity_image",
      key: "identity_image",
      title: "Image",
      render: (row) => (
        <img src={row} className="object-cover w-[30px] h-[30px] rounded-md" />
      ),
    },
    {
      dataIndex: "username",
      key: "username",
      title: "User Name",
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: "Phone Number",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
      render: (row) => (
        <a href={`mailto:${row}`} target="_blank">
          {row}
        </a>
      ),
    },
    {
      dataIndex: "address",
      key: "address",
      title: "Address",
    },
    {
      dataIndex: "role",
      key: "role",
      title: "Role",
    },
    {
      dataIndex: "",
      key: "",
      title: "status",
      render: (row) =>
        row?.status == "active" ? (
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-green-100 text-green-500">
            <FaCheck />
          </div>
        ) : (
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-red-100 text-red-500">
            <FaX />
          </div>
        ),
    },
    {
      dataIndex: "last_login",
      key: "last_login",
      title: "Last Login",
      render: (row) => {
        const date = formattedDate(row);
        return <p>{date}</p>;
      },
    },
    {
      dataIndex: "",
      key: "",
      title: "Verified",
      render: (row) =>
        row?.is_verified ? (
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-green-100 text-green-500">
            <FaCheck />
          </div>
        ) : (
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-red-100 text-red-500">
            <FaX />
          </div>
        ),
    },
    {
      dataIndex: "",
      key: "",
      title: "Actions",
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-1 p-3">
            <Menu.Item
              onClick={() => {
                setViewModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              View
            </Menu.Item>
           
            <Menu.Item
              onClick={() => navigate(`/employee-docs/1`)}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              Edit Docs
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setPermissionModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              Permissions
            </Menu.Item>
            <Menu.Item className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center">
              Send Balance
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setDisableModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              Disable
            </Menu.Item>
            <Menu.Item className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center" onClick={() => {
              setEditModal(true);
              setRowData(row)
            }}>
              Edit Employee
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setDeleteModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              Remove
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Space>
              <FaEllipsisVertical />
            </Space>
          </Dropdown>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchEmployees(searchValue));
  }, [searchValue]);

  function handleDeleteEmployee() {
    const data_send = {
      admin_id: rowData?.admin_id,
    };
    dispatch(deleteEmployees(data_send))
      .then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setDeleteModal(false);
          dispatch(fetchEmployees());
        } else {
          toast.success(res?.payload?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">Employee</h3>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center"
        >
          Add Employee
        </button>
      </div>

      <EmployeeBalanceModal
        open={employeeBalanceModal}
        setOpen={setEmployeeBalanceModal}
      />

      <ViewEmployeeModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        rowData={rowData}
        setRowData={setRowData}
      />
       <EditEmployeeModal open={editModal} rowData={rowData} setOpen={setEditModal} setRowData={setRowData}/>

      <Modal
        open={permissionModal}
        onCancel={() => setPermissionModal(false)}
        onClose={() => setPermissionModal(false)}
        footer={null}
        title="Add Permission"
      >
        <form>
          <div className="input-group">
            <label>Permissions</label>
            <select>
              <option disabled selected>
                Choose Permission
              </option>
              <option>خدمه العملاء - البائعين</option>
              <option>مدير فرع</option>
              <option>محصل</option>
              <option>اداره شئون الادارات القانونيه</option>
              <option>محصل غير معتمد</option>
            </select>
          </div>

          <button className="bg-[#0d6efd] mt-4 hover:bg-[#104ba3]  text-white p-2 rounded-sm w-full">
            Save
          </button>
        </form>
      </Modal>

      <Modal
        open={disableModal}
        onCancel={() => setDisableModal(false)}
        onClose={() => setDisableModal(false)}
        footer={null}
        title="Disable User"
      >
        <div className="flex flex-col gap-2">
          <div className="input-group">
            <label>Reason</label>
            <input type="text" />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button className="bg-red-700 text-white rounded-md p-3 flex justify-center items-center">
              Disable
            </button>
            <button className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-3 flex justify-center items-center">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onCancel={() => setDeleteModal(false)}
        footer={null}
      >
        <h3>Are you sure you want to delete this user?</h3>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleDeleteEmployee}
            className="bg-red-700 text-white rounded-md p-3 flex justify-center items-center"
          >
            {deleteLoading ? "Loading..." : "Remove"}
          </button>
          <button
            className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-3 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <AddEmployeeModal open={openAddModal} setOpen={setOpenAddModal} />

      <input
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Employee..."
        className="w-full rounded-md p-3 my-3 border border-gray-300 outline-hidden"
      />
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table scroll={{x:"max-content"}} columns={columns} dataSource={employees?.data?.rows} />
      )}
    </div>
  );
}
