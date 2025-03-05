import { Dropdown, Menu, Modal, Space, Table } from "antd";
import { FaEllipsisVertical, FaX } from "react-icons/fa6";
import UserBalanceModal from "../../../components/UsersPage/UserBalanceModal/UserBalanceModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const data = [
  // {
  //   id: 20202678,
  //   full_name: "موناز لبيب جرجس عبدالمسيح",
  //   phone: "01204708330",
  //   available_balance: "-50621.93",
  // },
  {
    id: 54531502,
    full_name: "محمد رزق محمد غانم",
    phone: "01150105635",
    available_balance: "-50550.26",
  },
];

export default function UsersBalance() {
  const [editBalanceModal, setEditBalanceModal] = useState(false);
  const [sendBalanceModal, setBalanceModal] = useState(false);
  const [balanceData, setBalanceData] = useState({
    acc_balance: 0,
    available_balance: 0,
    investment_balance: 0,
  });
  const {t} = useTranslation();
  function handleSubmit(e) {
    e.preventDefault();
  }

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "available_balance",
      key: "available_balance",
      title: t("availableBalanceText"),
      render: (balance) => {
        return (
          <p
            className={
              +balance < 0
                ? "text-red-700 font-medium"
                : +balance > 0
                ? "text-green-700 font-medium"
                : "text-gray-600 font-medium"
            }
          >
            {balance}
          </p>
        );
      },
    },
    {
      dataIndex: "available_balance",
      key: "available_balance",
      title: t("accountBalanceText"),
      render: (balance) => {
        return (
          <p
            className={
              +balance < 0
                ? "text-red-700 font-medium"
                : +balance > 0
                ? "text-green-700 font-medium"
                : "text-gray-600 font-medium"
            }
          >
            {balance}
          </p>
        );
      },
    },
    {
      dataIndex: "limit_per_month",
      key: "limit_per_month",
      title: t("limitPerMonthText"),
    },
    {
      dataIndex: "investment_balance",
      key: "investment_balance",
      title: t("investmentBalanceText"),
      render: (row) => (
        <p
          className={`w-[40px] h-[40px] flex justify-center items-center rounded-full ${
            row ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {row ? (
            <FaCheck className="text-green-700" />
          ) : (
            <FaX className="text-red-700" />
          )}
        </p>
      ),
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: t("phone"),
    },
    {
      dataIndex: "full_name",
      key: "full_name",
      title: t("fullName"),
    },
    {
      dataIndex: "id",
      title: t("actions"),
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-1 !p-2">
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center"
              onClick={() => {
                setEditBalanceModal(true);
              }}
            >
              {" "}
              {t("editUserBalanceText")}
            </Menu.Item>
            <Menu.Item
              className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white p-3 rounded-md"
              onClick={() => setBalanceModal(true)}
            >
              {" "}
              {t("sendBalanceText")}
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
      {/* <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">
          رصيد المستخدم
        </h3>
        <button
          className="bg-[#0d6efd] text-white p-3 rounded-md"
          onClick={() => setBalanceModal(true)}
        >
          ارسال رصيد
        </button>
      </div> */}
      <UserBalanceModal open={editBalanceModal} setOpen={setEditBalanceModal} />

      <Modal
        width={800}
        open={sendBalanceModal}
        onCancel={() => setBalanceModal(false)}
        onClose={() => setBalanceModal(false)}
        title={t("sendBalanceText")}
        footer={null}
      >
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-white shadow-lg p-4 rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="input-group">
                <label>{t("accountBalanceText")}</label>
                <input
                  value={balanceData?.acc_balance}
                  onChange={(e) =>
                    setBalanceData({
                      ...balanceData,
                      acc_balance: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              <div className="input-group">
                <label>{t("availableBalanceText")}</label>
                <input
                  value={balanceData?.available_balance}
                  onChange={(e) =>
                    setBalanceData({
                      ...balanceData,
                      available_balance: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              <div className="input-group">
                <label>{t("investmentBalanceText")}</label>
                <input
                  value={balanceData?.investment_balance}
                  onChange={(e) =>
                    setBalanceData({
                      ...balanceData,
                      investment_balance: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              <button className="bg-[#0d6efd] hover:bg-[#104ba3] w-full text-white p-2 rounded-sm">
                {t("saveBtn")}
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg p-4 rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="input-group">
                <label>{t("accountBalanceText")}</label>
                <input
                  value={balanceData?.acc_balance}
                  disabled
                  className="disabled:bg-gray-200"
                />
              </div>

              <div className="input-group">
                <label>{t("availableBalanceText")}</label>
                <input
                  value={balanceData?.available_balance}
                  disabled
                  className="disabled:bg-gray-200"
                />
              </div>

              <div className="input-group">
                <label>{t("investmentBalanceText")}</label>
                <input
                  value={balanceData?.investment_balance}
                  disabled
                  className="disabled:bg-gray-200"
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <input
        className="border border-gray-300 outlinn-hidden w-full rounded-md outline-hidden p-3 my-3"
        placeholder={t("searchText")}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
