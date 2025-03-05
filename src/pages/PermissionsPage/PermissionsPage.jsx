import { Modal, Table } from "antd";
import React, { useState } from "react";
import MultiSelect from "../../components/MultiSelect/MultiSelect";

const data = [
  {
    id: 1,
    name: "مدير فرع",
    desc: "تسجيل المبالغ المحصلة وتحديث الكشوفات بشكل مستمر وتنفيذ التعليمات المتعلقة بسرية المعاملات المالية والتعامل معها بالحرفية والمهنية العالية. 1-تحصيل 2-بيع منتج 3-بالتقسيط 4- تفصيل حسبات العميل",
  },
];

export default function PermissionsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewPermissionModal, setViewPermissionModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [employeeData, setEmployeeData] = useState({
    name: "",
    desc: "",
  });

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "desc",
      key: "desc",
      title: "Description",
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setViewPermissionModal(true);
              setRowData(row);
            }}
            className="bg-[#0d6efd]  p-2 rounded-md text-white flex justify-center items-center"
          >
            View
          </button>
          <button
            className="bg-red-700 text-white rounded-md p-2 flex justify-center items-center"
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];
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

      <Modal
        open={viewPermissionModal}
        onCancel={() => setViewPermissionModal(false)}
        onClose={() => setViewPermissionModal(false)}
        footer={null}
      >
        <form className="flex flex-col gap-2">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={rowData.name}
              onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              valye={rowData?.desc}
              onChange={(e) => setRowData({ ...rowData, desc: e.target.value })}
            ></textarea>
          </div>

          <div className="input-group">
            <label>Permissions</label>
            <MultiSelect />
          </div>

          <button className="border bg-[#0d6efd] mt-3 border-[#0d6efd] text-white outline-none rounded-md p-2 flex justify-center items-center">
            Save
          </button>
        </form>
      </Modal>

      <Modal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
        footer={null}
      >
        <h3>Are you sure you want to delete this employee?</h3>
        <div className="flex items-center gap-2 mt-4">
          <button className="bg-red-700 text-white rounded-md p-2 flex justify-center items-center">
            Remove
          </button>
          <button
            className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-2 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        onCancel={() => setOpenAddModal(false)}
        onClose={() => setOpenAddModal(false)}
        title="Add Employee"
        footer={null}
        open={openAddModal}
      >
        <form className="flex flex-col gap-3">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={employeeData.name}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, name: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              valye={employeeData?.desc}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, desc: e.target.value })
              }
            ></textarea>
          </div>

          <button className="mt-3 bg-[#0d6efd] hover:bg-[#104ba3]  p-2 rounded-md text-white flex justify-center items-center">
            Save
          </button>
        </form>
      </Modal>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
