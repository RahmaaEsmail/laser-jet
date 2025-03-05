import { Table, Modal, Spin, Menu, Space, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEllipsisVertical, FaTrash, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../features/usersSlice";
import { formattedDate } from "../../../utils/formattedDate";
import { toast } from "react-toastify";
import AddUserModal from "../../components/UsersPage/AddUserModal/AddUserModal";
import EditUserModal from "../../components/UsersPage/EditUserModal/EditUserModal";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: "1",
    name: "rahma",
    phone: "-19283789128",
  },
];

export default function UsersPage() {
  const navigate = useNavigate();
  const [addLoading, setAddLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { loading, deleteLoading, users } = useSelector(
    (state) => state?.users
  );
  const [rowData, setRowData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const {t} = useTranslation();
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

  const columns = [
    {
      dataIndex: "user_id",
      key: "user_id",
      title: "#",
    },
    {
      dataIndex: "username",
      key: "username",
      title: t("username"),
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: t("phone"),
    },
    {
      dataIndex: "email",
      key: "email",
      title: t("email"),
      render: (row) => (
        <a href={`mailto:${row}`} target="_blank">
          {row}
        </a>
      ),
    },
    {
      dataIndex: "role",
      key: "role",
      title: t("role"),
    },
    {
      dataIndex: "",
      key: "",
      title: t("status"),
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
      title: t("lastlogin"),
      render: (row) => {
        const date = formattedDate(row);
        return <p>{date}</p>;
      },
    },
    {
      dataIndex: "",
      key: "",
      title: t("verified"),
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
      key: "actions",
      title: t("actions"),
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-1 p-3">
            <Menu.Item
              key={"user-profile"}
              onClick={() => navigate(`/profile_user/${row?.id}`)}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              {t("userProfileText")}
            </Menu.Item>

            <Menu.Item
              key={"disable"}
              onClick={() => {
                setDisableModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
            >
              {t("disableText")}
            </Menu.Item>
            <Menu.Item
              key={"edit-user"}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
              onClick={() => {
                setEditModal(true);
                setRowData(row);
              }}
            >
              {t("editText")}
            </Menu.Item>
            <Menu.Item
              key="remove"
              onClick={() => {
                setDeleteModal(true);
                setRowData(row);
              }}
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-2 flex justify-center items-center"
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

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  function handleDeleteUser() {
    dispatch(deleteUser({ user_id: rowData?.user_id }))
      .then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setDeleteModal(false);
          dispatch(fetchUsers()); // Refresh users list
        } else {
          toast.error(res?.payload?.message);
        }
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    console.log(users?.data);
  }, [users]);
  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">{t("userPageTitle")}</h3>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center"
        >
          {t("addNewUserText")}
        </button>
      </div>

      <AddUserModal open={openAddModal} setOpen={setOpenAddModal} />
      <EditUserModal
        open={editModal}
        setOpen={setEditModal}
        rowData={rowData}
        setRowData={setRowData}
      />
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onCancel={() => setDeleteModal(false)}
        footer={null}
      >
        <h3>{t("areYouSureDeleteUserText")}</h3>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleDeleteUser}
            className="bg-red-700 text-white rounded-md p-3 flex justify-center items-center"
          >
            {deleteLoading ? t("loadingText") : t("deleteText")}
          </button>
          <button
            className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-3 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            {t("cancelText")}
          </button>
        </div>
      </Modal>

      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        placeholder={t("searchText")}
        className="my-3 border border-gray-300 p-3 w-full rounded-md outline-none"
      />
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users?.data && users?.data?.length ? users?.data : []}
          rowKey="id"
        />
      )}
    </div>
  );
}
