import { Dropdown, Table, Space, Menu, Modal } from "antd";
import React, { useState } from "react";
import { FaEllipsisVertical, FaTrash } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import UserViewModal from "../../../components/UsersPage/UserViewModal/UserViewModal";
import UserBalanceModal from "../../../components/UsersPage/UserBalanceModal/UserBalanceModal";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: "1",
    image: "https://laserjet-8405a.web.app/media/logos/logo.png",
    nationalId: "30110281899232",
    address: "tetshjws shahs",
    name: "rahma",
    phone: "-19283789128",
  },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const {} = useParams();
  const {t}= useTranslation();
  const [disableModal, setDisableModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editBalanceModal, setEditBalanceModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    password: "",
    confrimPass: "",
    nationalId: "",
    address: "",
  });
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });
  const [rowData, setRowData] = useState({});

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "image",
      key: "image",
      title: t("imageText"),
      render: (row) => (
        <img src={row} className="w-[50px] h-[50px] rounded-md" />
      ),
    },
    {
      dataIndex: "name",
      key: "name",
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
      dataIndex: "address",
      key: "address",
      title: t("addressText"),
    },
    {
      key: "actions",
      title: t("actions"),
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-1 !p-2">
             <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => {
                navigate("/user_orders");
              }}
            >
              {" "}
              {t("ordersText")} 
            </Menu.Item>


            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => {
                navigate("/account-requests");
              }}
            >
              {" "}
              {t("accountRequests")}
            </Menu.Item>
            
            <Menu.Item
              onClick={() => navigate(`/user_finance_transactions/${row?.id}`)}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
            >
              {t("financeTransactionsText")}
            </Menu.Item>

            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => navigate(`/user_docs/1`)}
            >
              {" "}
              {t("editDocsText")}
            </Menu.Item>

            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => {
                setDisableModal(true);
                setRowData(row);
              }}
            >
              {" "}
               {t("disableText")}
            </Menu.Item>

            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              onClick={() => {
                setViewModal(true);
                setRowData(row);
              }}
            >
              {" "}
              {t("editText")}
            </Menu.Item>
            
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => {
                setDeleteModal(true);
                setRowData(row);
              }}
            >
              {" "}
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

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">
          {t("userProfileText")}
        </h3>
      </div>

      <Modal
        open={disableModal}
        onCancel={() => setDisableModal(false)}
        onClose={() => setDisableModal(false)}
        footer={null}
        title={t("disableUserText")}
        // title="Disable User"
      >
        <div className="flex flex-col gap-2">
          <div className="input-group">
            <label>{t("reasonText")}</label>
            <input type="text" />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button className="bg-red-700 text-white rounded-md p-3 flex justify-center items-center">
              {t("disableText")}
            </button>
            <button className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-3 flex justify-center items-center">
              {t("cancelText")}
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
        <h3>{t("areYouSureDeleteUserText")}</h3>
        <div className="flex items-center gap-2 mt-4">
          <button className="bg-red-700 text-white rounded-md p-3 flex justify-center items-center">
            {t("deleteText")}
          </button>
          <button
            className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-3 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            {t("cancelText")}
          </button>
        </div>
      </Modal>

      <UserViewModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        rowData={rowData}
        setRowData={setRowData}
        imgs={imgs}
        setImgs={setImgs}
      />
      {/* <UserBalanceModal open={editBalanceModal} setOpen={setEditBalanceModal} /> */}

      <input
        type="text"
        placeholder={t("searchText")}
        className="my-3 border border-gray-300 p-3 w-full rounded-md outline-none"
      />
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}
