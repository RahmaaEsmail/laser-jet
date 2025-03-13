import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFetchOrderDetails } from "../../../features/ordersSlice";
import { Cascader, Dropdown, Menu, Modal, Spin, Table } from "antd";
import { FaCheck, FaEllipsisVertical, FaX } from "react-icons/fa6";

export default function OrderDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openImgModal, setOpenImgModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openInstallmentModal, setInstallmentModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editInstallmentModal, setEditInstallmentModal] = useState(false);
  const { orderDetails, loadingDetails } = useSelector(
    (state) => state?.orders
  );

  const columns = [
    {
      dataIndex: "product_id",
      key: "product_id",
      title: "#",
    },
    {
      dataIndex: "",
      key: "",
      title: t("imageText"),
      render: (row) => (
        <img
          src={row?.images?.length > 0 && row?.images[0]}
          className="w-[100px] h-[100px] object-cover rounded-md"
        />
      ),
    },
    {
      dataIndex: "title",
      key: "title",
      title: t("titleText"),
    },
    {
      dataIndex: "description",
      key: "description",
      title: t("description"),
    },
    {
      dataIndex: "",
      key: "",
      title: t("categoryText"),
      render: (row) => <p>{row?.category?.title}</p>,
    },
    {
      dataIndex: "quantity",
      key: "quantity",
      title: t("productQuantity"),
    },
    {
      dataIndex: "sympol",
      key: "sympol",
      title: t("productCodeText"),
    },
    {
      dataIndex: "price",
      key: "price",
      title: t("priceText"),
      render: (row) => (
        <p>
          {row} {t("egpText")}
        </p>
      ),
    },
    {
      dataIndex: "sell_price",
      key: "sell_price",
      title: t("sellPriceText"),
      render: (row) => (
        <p>
          {row} {t("egpText")}
        </p>
      ),
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      title: t("created_atText"),
      render: (row) => <p>{new Date(row)?.toLocaleString()}</p>,
    },

    {
      title: t("actions"),
      render: (row) => {
        const menu = (
          <Menu className="flex flex-col gap-1">
            <Menu.Item
              onClick={() => {
                setRowData(row);
                setOpenImgModal(true);
              }}
              className="!bg-blue-500 !text-white"
              key={"images"}
            >
              {t("images")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setRowData(row);
                setOpenDetailModal(true);
              }}
              className="!bg-blue-500 !text-white"
              key={"detailsText"}
            >
              {t("detailsText")}
            </Menu.Item>
            {orderDetails?.data?.order?.payment_method == "mini money" && (
              <Menu.Item
                onClick={() => {
                  setRowData(row);
                  setInstallmentModal(true);
                }}
                className="!bg-blue-500 !text-white"
                key="installment"
              >
                {t("InstallmentsText")}
              </Menu.Item>
            )}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <FaEllipsisVertical />
          </Dropdown>
        );
      },
    },
  ];

  const detailColumn = [
    {
      dataIndex: "product_detail_id",
      key: "product_detail_id",
      title: "#",
    },
    {
      dataIndex: "label",
      key: "label",
      title: t("labelText"),
    },
    {
      dataIndex: "value",
      key: "value",
      title: t("valueText"),
    },
  ];

  const installmentColumns = [
    {
      dataIndex: "installment_part_id",
      key: "installment_part_id",
      title: "#",
    },
    {
      dataIndex: "part_title",
      key: "part_title",
      title: t("installmentTitle"),
    },
    {
      dataIndex: "part_value",
      key: "part_value",
      title: t("installmentValue"),
      render: (row) => (
        <p>
          {row} {t("egpText")}
        </p>
      ),
    },
    {
      dataIndex: "part_pay_date",
      key: "part_pay_date",
      title: t("part_pay_date"),
    },
    {
      dataIndex: "part_status",
      key: "part_status",
      title: t("part_status"),
      render: (status) => {
        let className = "bg-gray-100 text-gray-500"; // Default class

        switch (status) {
          case "pending":
            className = "bg-gray-100 text-gray-500";
            break;
          case "paid":
            className = "bg-green-100 text-green-500";
            break;
          case "unpaid":
            className = "bg-red-100 text-red-500";
            break;
          case "refunded":
            className = "bg-blue-100 text-blue-500";
            break;
          case "stopped":
            className = "bg-orange-100 text-orange-500";
            break;
          case "paused":
            className = "bg-yellow-100 text-yellow-500";
            break;
          default:
            className = "bg-gray-200 text-gray-500";
        }

        return (
          <p className={`px-3 py-1 rounded-md font-semibold ${className}`}>
            {t(status)}
          </p>
        );
      },
    },
    {
      title: t("actions"),
      render: (row) => (
        <div>
          <button
            onClick={() => {
              setEditInstallmentModal(true);
              // setRowData(row);
            }}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {t("editText")}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(handleFetchOrderDetails({ order_id: id }));
  }, [id]);

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[20px] md:text-[25px] text-[#0d6efd]">
          {t("orderDetailsText")}
        </h3>
      </div>

      {loadingDetails ? (
        <div className="h-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="bg-white shadow-xl p-3 rounded-md">
          <div className="grid py-4 grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-center text-[18px] md:text-[23px] text-[#0d6efd]">
                LASERJET
              </h4>

              <div className="flex flex-col gap-3 text-gray-500">
                <p>
                  <stron className="font-medium">{t("customerText")} :</stron>{" "}
                  {orderDetails?.data?.order?.name}
                </p>
                <p>
                  <stron className="font-medium">{t("phone")} :</stron>{" "}
                  {orderDetails?.data?.order?.phone}
                </p>
                <p>
                  <stron className="font-medium">{t("locationText")} :</stron>{" "}
                  {orderDetails?.data?.order?.details}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-center text-[18px] md:text-[23px] text-[#0d6efd]">
                {t("ordersText")}
              </h4>

              <div className="flex flex-col gap-5 text-gray-500">
                <p>
                  <stron className="font-medium">{t("orderIdText")} :</stron> #
                  {orderDetails?.data?.order?.order_id}
                </p>
                <p>
                  <stron className="font-medium">{t("created_atText")} :</stron>{" "}
                  {/* {orderDetails?.data?.order?.phone} */}
                  {new Date(
                    orderDetails?.data?.order?.created_at
                  )?.toLocaleString()}
                </p>
                <p>
                  <stron className="font-medium">{t("updatedAtText")} :</stron>{" "}
                  {new Date(
                    orderDetails?.data?.order?.updated_at
                  )?.toLocaleString()}
                </p>
                <p>
                  <stron className="font-medium">
                    {t("orderStatusText")} :
                  </stron>{" "}
                  <span
                    className={`p-2 rounded-md ${
                      orderDetails?.data?.order?.order_status == "completed"
                        ? "bg-green-100 text-green-500"
                        : orderDetails?.data?.order?.order_status == "pending"
                        ? "bg-gray-100 text-gray-500"
                        : orderDetails?.data?.order?.order_status == "rejected"
                        ? "bg-red-100 text-red-500"
                        : orderDetails?.data?.order?.order_status == "canceled"
                        ? "bg-orange-100 text-orange-500"
                        : orderDetails?.data?.order?.order_status == "confirmed"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {orderDetails?.data?.order?.order_status}
                  </span>{" "}
                </p>
                <p>
                  <stron className="font-medium">
                    {t("paymentStatusText")} :
                  </stron>{" "}
                  <span
                    className={`p-2 rounded-md ${
                      orderDetails?.data?.order?.payment_status == "success"
                        ? "bg-green-100 text-green-500"
                        : orderDetails?.data?.order?.payment_status == "pending"
                        ? "bg-gray-100 text-gray-500"
                        : orderDetails?.data?.order?.payment_status == "failed"
                        ? "bg-red-100 text-red-500"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {orderDetails?.data?.order?.payment_status == "try to buy"
                      ? t("Payment_not_made")
                      : orderDetails?.data?.order?.payment_status}
                  </span>{" "}
                </p>
                <p>
                  <stron className="font-medium">
                    {t("paymentMethodText")} :
                  </stron>{" "}
                  {orderDetails?.data?.order?.payment_method}
                </p>
                <p>
                  <stron className="font-medium">{t("orderValueText")} :</stron>{" "}
                  {orderDetails?.data?.order?.total_price} {t("egpText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="font-semibold text-[20px] mt-5 md:text-[25px] text-[#0d6efd]">
        {t("productsText")}
      </h3>
      <Table
        scroll={{ x: "max-content" }}
        className="my-4"
        loading={loadingDetails}
        columns={columns}
        dataSource={
          orderDetails?.data?.order &&
          orderDetails?.data?.order?.products?.length &&
          orderDetails?.data?.order?.products
        }
      />

      <Modal
        open={editInstallmentModal}
        onCancel={() => {
          setEditInstallmentModal(false);
        }}
        onClose={() => setEditInstallmentModal(false)}
        title={t("editInstallmentText")}
        okText={t("editText")}
        cancelText={t("cancelText")}
      >
        <div className="input-group">
          <label>{t("part_status")}</label>
          <select>
            <option value="" disabled selected>
              Select Option
            </option>
            <option value="paid">Paid</option>
            <option value="unpaid">unPaid</option>
            <option value="refunded">Refunded</option>
            <option value="pending">Pending</option>
            <option value="stopped">Stopped</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </Modal>

      <Modal
        open={openDetailModal}
        onCancel={() => setOpenDetailModal(false)}
        onClose={() => setOpenDetailModal(false)}
        title={t("detailsText")}
        footer={null}
      >
        <Table
          scroll={{ x: "max-content" }}
          loading={loadingDetails}
          columns={detailColumn}
          dataSource={rowData?.details?.length ? rowData.details : []}
        />
      </Modal>

      <Modal
        open={openImgModal}
        onCancel={() => setOpenImgModal(false)}
        onClose={() => setOpenImgModal(false)}
        title={t("imagesText")}
        footer={null}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {rowData?.images?.length &&
            rowData?.images?.map((item) => (
              <img src={item} className="w-[100px] h-[100px] rounded-md" />
            ))}
        </div>
      </Modal>

      <Modal
        open={openInstallmentModal}
        onCancel={() => setInstallmentModal(false)}
        onClose={() => setInstallmentModal(false)}
        title={t("InstallmentsText")}
        footer={null}
      >
        <Table
          scroll={{ x: "max-content" }}
          loading={loadingDetails}
          columns={installmentColumns}
          dataSource={
            rowData?.product_installments?.length
              ? rowData.product_installments
              : []
          }
        />
      </Modal>
    </div>
  );
}
