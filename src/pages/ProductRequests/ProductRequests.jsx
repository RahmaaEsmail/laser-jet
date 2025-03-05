import { Modal, Table } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    Username: "LASERJET",
    phone: "01004331113",
    nationalId: "602013372",
    Date: "الاثنين، ٢٦ أغسطس ٢٠٢٤ في ١٠:١١ م",
    sub_total: "8809 EGP",
    Total: "8844 EGP",
    count: 1,
    Status: "Cancelled",
  },
];

export default function ProductRequests() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "Username",
      key: "Username",
      title: t("username"),
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: t("phone"),
    },
    {
      dataIndex: "nationalId",
      key: "nationalId",
      title: t("nationalId"),
    },
    {
      dataIndex: "Date",
      key: "Date",
      title: t("dateText"),
    },
    {
      dataIndex: "sub_total",
      key: "sub_total",
      title: "Sub total",
    },
    {
      dataIndex: "Total",
      key: "Total",
      title: "Total",
    },
    {
      dataIndex: "count",
      key: "count",
      title: t(""),
    },
    {
      dataIndex: "Status",
      key: "Status",
      title: t("statusText"),
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-3 items-center">
          <button
            className="bg-[#0d6efd] text-white rounded-md flex p-2 justify-center items-center"
            onClick={() => {
              navigate(`/product_requests_details/${row?.id}`)
            }}
          >
            View
          </button>
          <button
            className="bg-red-700 text-white rounded-md flex p-2 justify-center items-center"
            onClick={() => {
              setDeleteModal(true);
              setRowData(row);
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
      <h3 className="font-semibold text-[25px] text-[#0d6efd]">
        Product Requests
      </h3>

      <Modal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
        footer={null}
      >
        <h3>Do you want to delete product request?</h3>
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

      <input
        type="text"
        placeholder="Search product requests..."
        className="w-full rounded-md border border-gray-300 p-3 my-3 outline-hidden"
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
