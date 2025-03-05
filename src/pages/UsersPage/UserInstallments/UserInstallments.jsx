import React, { useState } from "react";
import AddInstallmentModal from "../../../components/InstallmentsPage/AddInstallmentModal/AddInstallmentModal";
import { Dropdown, Menu, Space, Table } from "antd";
import { FaEllipsisVertical } from "react-icons/fa6";
import EditInstallmentModal from "../../../components/InstallmentsPage/EditInstallmentModal/EditInstallmentModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 1,
    desc: "Vivo 27 mobile, 8 GB RAM, 256 GB storage-S/N:10JD8100UL00HG",
    title: "ناديه جورج عزيز عطية ",
    total_value: "",
    start_date: "",
    installment_value: "",
    total_installments: "",
    installment_interval: "",
  },
];

export default function UserInstallments() {
  const navigate = useNavigate();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const {t} = useTranslation();
  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "title",
      key: "title",
      title:t("nameText"),
    },
    {
      dataIndex: "desc",
      key: "desc",
      title: t("description"),
    },
    {
      dataIndex: "total_value",
      key: "total_value",
      title: t("totalValueText"),
    },
    {
      dataIndex: "total_installments",
      key: "total_installments",
      title: t("TotalInstallmentsText"),
    },
    {
      dataIndex: "installment_value",
      key: "installment_value",
      title: t("TotalInstallmentsValueText"),
    },
    {
      dataIndex: "installment_interval",
      key: "installment_interval",
      title: t("InstallmentIntervalText"),
    },
    {
      title: "Actions",
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-2 !p-2">
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              key="add"
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              {t("addText")}
            </Menu.Item>
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              key="edit"
              onClick={() => {
                setOpenEditModal(true);
              }}
            >
              {t("editText")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate(`/installments_logs/1`);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              key="logs"
            >
             {t("viewLogsText")}
            </Menu.Item>
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              key="delete"
            >
              {t("deleteText")}
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
  return (
    <div>
      
      <EditInstallmentModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        rowData={rowData}
        setRowData={setRowData}
      />
      <AddInstallmentModal open={openAddModal} setOpen={setOpenAddModal} />
      <input
        type="text"
        placeholder={t("searchText")}
        className="border border-gray-300 outline-hidden p-3 my-3 w-full rounded-md"
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
