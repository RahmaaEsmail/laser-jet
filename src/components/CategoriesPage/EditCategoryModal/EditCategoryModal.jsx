import { Modal, Spin, Switch } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategories,
  fetchCategories,
  handleDeleteInstallmentCategory,
} from "../../../features/categoriesSlice";
import { toast } from "react-toastify";

export default function EditCategoryModal({
  editModal,
  setEditModal,
  selectedInputs,
  setSelectedInputs,
  rowData,
  setRowData,
  setImgs,
  imgs,
  setOpenInstallmentsModal,
  installmentData,
  setInstallmentData,
}) {
  const { t } = useTranslation();
  const { editLoading, deleteCategoryInstallmentLoading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const { data: installments, loading: installmentLoading } = useSelector(
    (state) => state?.installments
  );

  function handleInstallmentChange(event) {
    const id = event.target.value;
    const value = installments?.data?.installmentTitles?.find(
      (item) => item?.installment_id == id
    )?.installment_title;
    console.log();

    setRowData((prev) => {
      const exists = prev?.installments?.find(
        (item) => item.installment_id == id
      );

      if (!exists) {
        return {
          ...prev,
          installments: [
            ...prev.installments,
            {
              installment_id: id,
              installment_gain: "",
              installment_title: value,
            },
          ],
        };
      }
      return prev;
    });
  }

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  function handleInputChange(e, key) {
    const value = e.target.value;
    console.log(key);
    setRowData((prev) => ({
      ...prev,
      installments: prev.installments.map((item) =>
        item?.installment_id == key
          ? { ...item, installment_gain: value }
          : item
      ),
    }));
  }

  function handleDelete(id) {
    const data_send = {
      category_id: rowData?.category_id,
      data: [
        {
          installment_id: id,
        },
      ],
    };

    dispatch(handleDeleteInstallmentCategory(data_send))
      .then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          dispatch(fetchCategories({ page: 1, limit: 20 }));
          setRowData((prev) => ({
            ...prev,
            installments: prev.installments?.filter(
              (item) => item?.installment_id !== id
            ),
          }));
        } else {
          toast.error(res?.payload || "هناك مشكله في حذف القسط");
        }
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(rowData);
    console.log(selectedInputs);
    const formData = new FormData();
    formData.append("category_id", rowData.category_id);
    formData.append("title", rowData?.title);
    formData.append("description", rowData?.description);
    formData.append("is_active", rowData?.is_active);
    if (imgs?.url) formData.append("image", imgs?.file);
    rowData.installments?.length > 0 &&
      rowData?.installments?.forEach(
        (item, key) => (
          formData.append(`data[${key}][installment_id]`, item?.installment_id),
          formData.append(`data[${key}][value]`, item?.installment_gain)
        )
      );

    dispatch(editCategories(formData))
      .then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          dispatch(fetchCategories({ page: 1, per_page: 20 }));
          setEditModal(false);
          setRowData({});
          setImgs({ file: null, url: "" });
        } else {
          toast.error(res?.payload || "هناك مشكله في تعديل الفئة");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <Modal
      open={editModal}
      onCancel={() => setEditModal(false)}
      onClose={() => setEditModal(false)}
      footer={null}
      title={t("editCategory")}
    >
      <div className="flex flex-col gap-3">
        <div className="input-group">
          <label>{t("nameText")}</label>
          <input
            value={rowData?.title}
            onChange={(e) =>
              setRowData({
                ...rowData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>{t("profitPercentage")}</label>
          <input
            type="number"
            onChange={(e) =>
              setRowData({
                ...rowData,
                gain: +e.target.value,
              })
            }
            value={rowData?.gain}
          />
        </div>

        <div className="input-group">
          <label>{t("description")}</label>
          <textarea
            onChange={(e) =>
              setRowData({
                ...rowData,
                description: e.target.value,
              })
            }
            value={rowData?.description}
          ></textarea>
        </div>

        <div className="input-group">
          <div className="flex justify-between items-center my-3">
            <label>{t("PercentageIncreaseInPremium")}</label>
            <button
              onClick={() => setOpenInstallmentsModal(true)}
              className="w-fit bg-blue-500 p-2 text-white cursor-pointer rounded-md"
            >
              {t("createInstallment")}
            </button>
          </div>

          <select
            className="p-[2vh] w-fit border rounded-md"
            onChange={(e) => handleInstallmentChange(e)}
          >
            <option value="" disabled selected>
              {t("chooseInstallmentText")}
            </option>
            {installmentLoading ? (
              <Spin size="md" />
            ) : (
              installments?.data?.installmentTitles?.map((item) => (
                <option
                  className="flex justify-between items-center"
                  key={item.installment_id}
                  value={item?.installment_id}
                >
                  <span>{item.installment_title}</span>
                  <FaTrash className="text-red-500" />
                </option>
              ))
            )}
          </select>
        </div>

        {rowData?.installments?.map((item) => (
          <div className="input-group" key={item?.installment_id}>
            <label>
              {t("ValueForText")} {item?.installment_title}:
            </label>
            <div className="flex justify-between items-center gap-3">
              <input
                type="text"
                value={item?.installment_gain}
                onChange={(e) => handleInputChange(e, item?.installment_id)}
              />
              <FaTrash
                onClick={() => handleDelete(item?.installment_id)}
                className="text-red-400"
              />
            </div>
          </div>
        ))}

        <div className="input-group">
          <label>{t("imagesText")}</label>
          <input
            onChange={(e) =>
              setImgs({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              })
            }
            type="file"
            accept="image/*"
          />
        </div>

        {(imgs.url || rowData?.image_url) && (
          <div className="flex items-center gap-[1.4vh]">
            <img
              className="w-[20vh] h-[20vh] rounded-[3vh]"
              src={imgs?.url || rowData?.image_url}
            />
            <FaTrash
              onClick={() => setImgs({ file: null, url: "" })}
              className="text-red-700"
            />
          </div>
        )}

<div className="flex gap-2 items-center mt04">
          <Switch
            defaultChecked={rowData.is_active}
            onChange={(e) => setRowData({ ...rowData, is_active: e })}
          />
          <label className="text-[17px]">{t("isActiveText")}</label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-3 bg-[#0d6efd] hover:bg-[#104ba3] p-2 rounded-md text-white flex justify-center items-center"
        >
          {editLoading || deleteCategoryInstallmentLoading
            ? t("loadingText")
            : t("saveBtn")}
        </button>
      </div>
    </Modal>
  );
}
