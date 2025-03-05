import { Dropdown, Menu, Modal, Spin } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  fetchCategories,
} from "../../../features/categoriesSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import { FaEdit, FaEllipsisV } from "react-icons/fa";

export default function AddCategoryModal({
  openAddModal,
  setOpenAddModal,
  setSelectedInputs,
  setImgs,
  imgs,
  productSectionData,
  setProductSectionData,
  selectedInputs,
  setOpenInstallmentsModal,
}) {
  const { t } = useTranslation();
  const { addLoading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { data: installments, loading: installmentLoading } = useSelector(
    (state) => state?.installments
  );
  const [deleteModal , setDeleteModal] = useState(false);
  const [editModal , setEditModal] = useState(false);
  const [installmentData , setInstallmentData] = useState({});

  function handleInstallmentChange(event) {
    const id = event.target.value;
    console.log(id);
    const value = installments?.data?.installmentTitles?.find(
      (item) => item?.installment_id == id
    )?.installment_title;

    setSelectedInputs((prev) => {
      const exists = prev.find((item) => item.installment_id === id);

      if (!exists) {
        return [
          ...prev,
          { installment_id: id, value: "", installment_title: value },
        ];
      }
      return prev;
    });
  }

  function handleInputChange(e, key) {
    const value = e.target.value;
    setSelectedInputs((prev) =>
      prev?.map((item) =>
        item?.installment_id == key ? { ...item, value } : item
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
     if(!productSectionData?.title) {
      toast.warn("ادخل عنوان الفئة اةلا");
      return;
     }

     if(!productSectionData?.description) {
      toast.warn("ادخل وصف الفئة اةلا");
      return;
     }

     const emptyVal = selectedInputs?.some(item => !item.value);
     if(emptyVal) {
      toast.warn("برجاء ادخال جميع قيم القسط");
      return;
     }

     if(!imgs?.file) {
      toast.warn("ادخل صوره الفئة اةلا");
      return;
     }

     const formData = new FormData();
     formData.append("title", productSectionData.title);
     formData.append("description", productSectionData.description);
     formData.append("image", imgs.file);
     formData.append("gain", productSectionData.gain);
     selectedInputs.forEach((item , key) => (
      formData.append(`data[${key}][installment_id]` , item?.installment_id),
      formData.append(`data[${key}][value]` , item?.value)
    ))

     dispatch(addCategories(formData)).then(res => {
      if(res?.payload?.success) {
        toast.success(res?.payload.message)
        dispatch(fetchCategories({page:1,per_page:7, keywords:""}))
        setOpenAddModal(false);
        setProductSectionData({
          title:"",
          description:"",
          image:"",
          gain:null,
        })
        setSelectedInputs([]);
        setImgs({
          file:null,
          url:"",
        })
      }else {
        toast.error(res?.payload)
      }
     }).catch(e => console.log(e))
     .finally(() => {
      setOpenAddModal(false);
      setProductSectionData({
        title:"",
        description:"",
        image:"",
        gain:null
      })
      setImgs({
        file:null,
        url:"",
      })
      setSelectedInputs([]);
     })
  }

  return (
    <Modal
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      title={t("addCategory")}
    >
      <div className="flex flex-col gap-3">
        <div className="input-group">
          <label>{t("nameText")}</label>
          <input
            value={productSectionData?.title}
            onChange={(e) =>
              setProductSectionData({
                ...productSectionData,
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
              setProductSectionData({
                ...productSectionData,
                gain: +e.target.value,
              })
            }
            value={productSectionData?.gain}
          />
        </div>

        <div className="input-group">
          <label>{t("description")}</label>
          <textarea
            onChange={(e) =>
              setProductSectionData({
                ...productSectionData,
                description: e.target.value,
              })
            }
            value={productSectionData?.description}
          ></textarea>
        </div>

        <div className="input-group">
          <div className="flex flex-col gap-3">
        <div className="input-group">
         <div className="flex justify-between items-center">
         <label>{t("PercentageIncreaseInPremium")}</label>
          <button
            onClick={() => setOpenInstallmentsModal(true)}
            className="w-fit bg-blue-500 p-2 text-white cursor-pointer rounded-md"
          >
            {t("createInstallment")}
          </button>
         </div>
        </div>

        {/* Custom Installment Dropdown Instead of <select> */}
        <Dropdown
          overlay={
            <Menu>
              {installmentLoading ? (
                <Spin size="md" />
              ) : (
                installments?.data?.installmentTitles?.map((item) => (
                  <Menu.Item key={item.installment_id}>
                    <div className="flex justify-between items-center w-full">
                      <span onClick={() => handleInstallmentChange(item.installment_id)}>
                        {item.installment_title}
                      </span>
                      <div className="flex gap-2">
                        <FaEdit
                          className="text-blue-500 cursor-pointer"
                          onClick={() => {
                            setDeleteModal(true)
                            setInstallmentData(item)
                          }}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setDeleteModal(true)
                            setInstallmentData(item)
                          }}
                        />
                      </div>
                    </div>
                  </Menu.Item>
                ))
              )}
            </Menu>
          }
          trigger={["click"]}
        >
          <button className="p-2 bg-gray-200 rounded-md w-full flex justify-between">
            {t("chooseInstallmentText")}
            <FaEllipsisV />
          </button>
        </Dropdown>

        {/* Selected Installments */}
        {selectedInputs?.map((item) => (
          <div className="input-group flex justify-between items-center" key={item?.installment_id}>
            <label>
              {t("ValueForText")} {item?.installment_title}:
            </label>
            <input
              type="text"
              value={item?.value}
              onChange={(e) => handleInputChange(e, item?.installment_id)}
              className="p-2 border rounded-md"
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDeleteInstallment(item?.installment_id)}
            />
          </div>
        ))}
      </div>

          {/* <select
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
          </select> */}
        </div>

        {selectedInputs?.map((item) => (
          <div className="input-group" key={item?.installment_id}>
            <label>
              {t("ValueForText")} {item?.installment_title}:
            </label>
            <input
              type="text"
              value={item?.value}
              onChange={(e) => handleInputChange(e, item?.installment_id)}
            />
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

        {imgs?.url && (
          <div className="flex items-center gap-[1.4vh]">
            <img className="w-[20vh] h-[20vh] rounded-[3vh]" src={imgs?.url} />
            <FaTrash
              onClick={() =>
                setImgs({
                  file: null,
                  url: "",
                })
              }
              className="text-red-700"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-3 bg-[#0d6efd] hover:bg-[#104ba3] p-2 rounded-md text-white flex justify-center items-center"
        >
          {addLoading ? t("loadingText") : t("saveBtn")}
        </button>
      </div>
    </Modal>
  );
}
