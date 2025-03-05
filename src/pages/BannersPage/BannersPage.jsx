import { Modal, Spin, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBanners,
  deleteBanners,
  editBanners,
  fetchBanners,
} from "../../features/bannersSlice";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function BannersPage() {
  const [rowData, setRowData] = useState({});
  const {t} = useTranslation();
  const [bannerData, setBannerData] = useState({
    banner_target: "",
    banner_title: "",
    banner_description: "",
    description: "",
    banner_link: "",
    is_active: false,
  });
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { data, addLoading , editLoading , deleteLoading, loading } = useSelector(
    (state) => state?.banner
  );
  const columns = [
    {
      dataIndex: "banner_id",
      key: "banner_id",
      title: "#",
    },
    {
      dataIndex: "",
      key: "",
      title: t("imageText"),
      render: (row) => (
        <a href={row?.banner_link} target="_blank">
          {" "}
          <img
            src={row?.image_url}
            className="w-[100px] h-[100px] object-cover rounded-sm"
          />{" "}
        </a>
      ),
    },
    {
      dataIndex: "banner_target",
      key: "banner_target",
      title: t("targetText"),
    },
    {
      dataIndex: "banner_title",
      key: "banner_title",
      title: t("titleText"),
    },
    {
      dataIndex: "banner_description",
      key: "banner_description",
      title: t("description"),
    },
    {
      dataIndex: "",
      key: "",
      title: t("actions"),
      render: (row) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              console.log(row);
              setRowData(row);
              setOpenEditModal(true);
            }}
            className="bg-[#0d6efd] text-white p-2 rounded-md flex justify-center items-center"
          >
            {t("editText")}
          </button>
          <button
            className="bg-red-700 text-white p-2 rounded-md flex justify-center items-center"
            onClick={() => {
              console.log(row);
              setRowData(row);
              setDeleteModal(true);
            }}
          >
            {t("deleteText")}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  function handleSubmit() {
    if(!imgs.file) {
      toast.warn("ادخل الصوره أولا!");
      return;
    }
    const formData = new FormData();
    formData.append("banner_link", bannerData.banner_link);
    formData.append("image", imgs.file);
    formData.append("banner_title", bannerData.banner_title);
    formData.append("banner_description", bannerData.banner_description);
    formData.append("banner_target", bannerData.banner_target);
    formData.append("is_active", bannerData.is_active);

    dispatch(addBanners(formData))
      .then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setOpenAddModal(false);
          dispatch(fetchBanners());
        } else {
          toast.error(res?.payload || "An Error while creating banner");
          setOpenAddModal(false);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setOpenAddModal(false);
        setImgs({
          file: null,
          url: "",
        });
        setBannerData({
          banner_link: "",
          banner_target: "",
          is_active: false,
        });
      });
  }

  function handleDelete() {
    const data_send = {
      banner_id: rowData?.banner_id,
    };

    dispatch(deleteBanners(data_send))
      .then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          dispatch(fetchBanners());
          setDeleteModal(false);
        } else {
          toast.success(res?.payload || "An error while deleting banner");
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEdit() {

    const formData = new FormData();
    formData.append("banner_id",rowData?.banner_id)
    formData.append("banner_link", rowData.banner_link);
    if(imgs.file) {
      formData.append("image", imgs.file);
    }
    formData.append("banner_title", rowData.banner_title);
    formData.append("banner_description", rowData.banner_description);
    formData.append("banner_target", rowData.banner_target);
    formData.append("is_active", rowData.is_active);

    dispatch(editBanners(formData))
      .then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setOpenEditModal(false);
          dispatch(fetchBanners());
        } else {
          toast.error(res?.payload || "An Error while editing banner");
          setOpenEditModal(false);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setOpenEditModal(false);
        setImgs({
          file: null,
          url: "",
        });
        setRowData({});
      });
  }

  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">{t("bannerText")}</h3>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center"
        >
          {t("addBannerText")}
        </button>
      </div>

      <Modal
        footer={null}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onCancel={() => setOpenEditModal(false)}
        title={t("editBannerText")}
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
          <div className="input-group">
            <label>{t("targetText")}</label>
            <input
              type="text"
              value={rowData?.banner_target}
              onChange={(e) => setRowData({ ...rowData, banner_target: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>{t("titleText")}</label>
            <input
              type="text"
              value={rowData?.banner_title}
              onChange={(e) => setRowData({ ...rowData, banner_title: e.target.value })}
            />
          </div>
          </div>

          <div className="input-group">
            <label>{t("description")}</label>
            <textarea
              value={rowData.banner_description}
              onChange={(e) =>
                setRowData({ ...bannerData, banner_description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="input-group">
            <label>{t("imagesText")}</label>
            <input
              type="file"
              onChange={(e) =>
                setImgs({
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                })
              }
              accept="image/*"
            />
          </div>

          <button onClick={handleEdit} className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center w-full">
            {editLoading ? t("loadingText") : t("saveBtn")} 
          </button>
        </div>
      </Modal>

      <Modal
        footer={null}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onCancel={() => setOpenAddModal(false)}
        title={t("addBannerText")}
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="input-group">
              <label>{t("fullName")}</label>
              <input
                type="text"
                value={bannerData?.banner_title}
                onChange={(e) =>
                  setBannerData({ ...bannerData, banner_title: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>{t("targetText")}</label>
              <input
                type="text"
                value={bannerData?.banner_target}
                onChange={(e) =>
                  setBannerData({
                    ...bannerData,
                    banner_target: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>{t("bannerLinkText")}</label>
            <input
              type="text"
              value={bannerData?.banner_link}
              onChange={(e) =>
                setBannerData({ ...bannerData, banner_link: e.target.value })
              }
            />
          </div>

          {/* <div className="input-group">
            <label>Description</label>
            <textarea
              value={bannerData.description}
              onChange={(e) =>
                setBannerData({ ...bannerData, description: e.target.value })
              }
            ></textarea>
          </div> */}

          <div className="flex gap-3 items-center">
            <label>{t("isActive")}</label>
            <Switch
              defaultChecked={bannerData.is_active}
              onChange={(e) => setBannerData({ ...bannerData, is_active: e })}
            />
          </div>

          <div className="input-group">
            <label>{t("imagesText")}</label>
            <input
              type="file"
              onChange={(e) =>
                setImgs({
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                })
              }
              accept="image/*"
            />
          </div>

          {imgs.url && (
            <div className="flex gap-2 items-center">
              <img
                src={imgs.url}
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              <FaTrash
                className="text-red-700"
                onClick={() => setImgs({ file: null, url: "" })}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center w-full"
          >
            {addLoading ? t("loadingText") : t("saveBtn")}
          </button>
        </div>
      </Modal>

      <Modal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
        footer={null}
      >
        <h3 className="text-[18px] font-medium">
          {t("deleteBannerText")}
        </h3>
        <div className="flex gap-2 items-center mt-3">
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white flex justify-center items-center p-2 rounded-md"
          >
            {deleteLoading ? t("loadingText") : t("deleteText")}
          </button>
          <button className="border border-[#0d6efd] text-[#0d6efd] flex justify-center items-center p-2 rounded-md">
            {t("cancelText")}
          </button>
        </div>
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={data?.data?.banners} />
      )}
    </div>
  );
}
