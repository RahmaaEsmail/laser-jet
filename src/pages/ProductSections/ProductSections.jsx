import { Dropdown, Menu, Modal, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEllipsisVertical, FaTrash, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addCategories, deleteCategories, editCategories, fetchCategories } from "../../features/categoriesSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { handleCreateInstallMent, handleFetchInstallment } from "../../features/installemntsSlice";
import moment from "moment/moment";
import AddCategoryModal from "../../components/CategoriesPage/AddCategoryModal/AddCategoryModal";
import EditCategoryModal from "../../components/CategoriesPage/EditCategoryModal/EditCategoryModal";
import EditInstallmentCategoryModal from "../../components/CategoriesPage/EditInstallmentCategoryModal/EditInstallmentCategoryModal";
import DeleteInstallmentCategoryModal from "../../components/CategoriesPage/DeleteInstallmentCategoryModal/DeleteInstallmentCategoryModal";

export default function ProductSections() {
  const {t} = useTranslation(); 
  const [assignModal, setAssignModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInstallmentsModal , setOpenInstallmentsModal] = useState(false);
  const [addInstallmentModal , setAddInstallmentModal] =useState(false);
  const [editInstallmentModal , setEditInstallmentModal] =useState(false);
  const [removeInstallmentModal , setRemoveInstallmentModal] =useState(false);
  const [rowData, setRowData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [installmentRowData , setInstallmentRowData] = useState({})
  const [searchVal , setSearchVal] = useState("");
  const dispatch = useDispatch();
  const {data: installments , loading : installmentLoading , addLoading : installmentAddLoading} = useSelector(state => state?.installments)
  const [inputData , setInputData] = useState([
    {
        id:1,
        value:"",
        label:"",
        placeholder:""
    }
  ])
  const [installmentData , setInstallmentData] = useState({
    installment_title:"",
    installment_number:null
  })
  const [openViewInstallment , setOpenViewInstallment]= useState(false)
  const [selectedInputs , setSelectedInputs] = useState([])
  const {data , deleteLoading ,editLoading ,loading , addLoading , categories} = useSelector(state => state.categories)
  const [productSectionData, setProductSectionData] = useState({
    title: "",
    description: "",
    image:"",
    gain:""
  });
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });

  const columns = [
    {
      dataIndex:"category_id",
      key:"category_id",
      title:"#"
    },
    {
      dataIndex:"image_url",
      key:"image_url",
      title:t("imageText"),
      render:(row) => <img src={row} className="w-[100px] h-[100px] object-cover rounded-md"/>
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
      dataIndex:"gain",
      key:"gain",
      title:t("profitPercentage"),
      render:(row) => <p>{row}%</p>
    },
    {
      dataIndex:"created_at",
      key:"created_at",
      title:t("createdAtText"),
      render:(row) => <p>{moment(row).format("YYYY-MM-DD HH:mm:ss")}</p>
    },
    {
      dataIndex:"is_active",
      key:"is_active",
      title:t("isActiveText"),
      render: (row) =>
              row  ? (
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
      dataIndex: "",
      key: "",
      title: t("actions"),
      render: (row) => (
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setEditModal(true);
              setRowData(row);
            }}
            className="bg-[#0d6efd] text-white rounded-md flex p-2 justify-center items-center"
          >
            {t("editText")}
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
              setRowData(row)
            }}
            className="bg-red-700 text-white rounded-md flex p-2 justify-center items-center"
          >
            {t("deleteText")}
          </button>
          <button onClick={() => {
            setOpenViewInstallment(true)
            setRowData(row)
          }} className="bg-[#0d6efd] text-white rounded-md flex p-2 justify-center items-center">{t("viewInstallmentsText")}</button>
        </div>
      ),
    },
  ];

  const installmentsColumns = [
    {
      dataIndex:"installment_id",
      key:"installment_id",
      title:"#",
    },
    {
      dataIndex:"installment_title",
      key:"installment_title",
      title:t("installmentTitle"),
    },
    {
      dataIndex:"installment_gain",
      key:"installment_gain",
      title:t("PercentageIncreaseInPremium"),
      render:(row) => <p>{row}%</p>
    },
    {
      title:t("actions"),
      render:(row) => {
        const menu = (
          <Menu className="flex flex-col gap-1 !p-2">
            
            <Menu.Item onClick={() => {
               console.log(row)
               setEditInstallmentModal(true)
               setInstallmentRowData(row)
            }} className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center" key="edit">{t("editText")}</Menu.Item>
            <Menu.Item onClick={() => {
               console.log(row)
               setRemoveInstallmentModal(true)
               setInstallmentRowData(row)
            }} className="bg-[#0d6efd] hover:!bg-[#0d6efd] !text-white rounded-md p-3 flex justify-center items-center" key="delete">{t("deleteText")}</Menu.Item>
          </Menu>
        ) 
        return (
          <Dropdown overlay={menu} trigger={['click']}>
              <FaEllipsisVertical/>
          </Dropdown>
        )
      }

    }
  ]

  useEffect(() => {
    dispatch(fetchCategories({page:1,per_page:7,keywords:searchVal}))
  }
 ,[searchVal])



 function handleDelete() {
  const data_send = {
    category_id : rowData?.category_id
  }
  dispatch(deleteCategories(data_send)).then(res => {
    if(res?.payload?.success) {
      toast.success(res?.payload.message)
      dispatch(fetchCategories({page:1,per_page:7,keywords:searchVal}))
      setDeleteModal(false);
    }else {
      toast.error(res?.payload)
    }
  }).catch(e => console.log(e))
  .finally(() => {
    setDeleteModal(false)
  })
 }

 

  function handleSubmitInstallment() {
     const data_send = {
      installment_number : installmentData?.installment_number,
      installment_title: installmentData?.installment_title
     }
    console.log(data_send)
     dispatch(handleCreateInstallMent(data_send))
     .then(res => {
      console.log(res)
      if(res?.payload?.success) {
        toast.success(res?.payload?.message);
        setInstallmentData({installment_title :"" , installment_number : ""})
        dispatch(handleFetchInstallment());
        setOpenInstallmentsModal(false)
      }else {
        toast.error(res?.payload || "هناك خطأ أثناء اضافه قسط")
      }
     }).catch(e => console.log(e))
  }

  useEffect(() => {
    dispatch(handleFetchInstallment())
  } ,[dispatch])



  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[20px] md:text-[25px] text-[#0d6efd]">{t("categoriesText")}</h3>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-1 md:p-3 flex justify-center items-center"
        >
          {t("addCategory")}
        </button>
      </div>

      <Modal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
        footer={null}
      >
        <h3>{t("deleteCategoryText")}</h3>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleDelete} className="bg-red-700 text-white rounded-md p-2 flex justify-center items-center">
            {deleteLoading ? <Spin className="text-white"/> :t("deleteText")}
          </button>
          <button
            className="border border-[#0d6efd] text-[#0d6efd] outline-none rounded-md p-2 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            {t("cancelText")}
          </button>
        </div>
      </Modal>

       
      <Modal footer={null} open={openViewInstallment} onCancel={() => setOpenViewInstallment(false)} onClose={() => setOpenViewInstallment(false)} okText={t("addText")} cancelText={t("cancelText")} title={t("viewInstallmentsText")}>
         <Table scroll={{x:"max-content"}} columns={installmentsColumns} dataSource={rowData?.installments ||[]} />
      </Modal>

      <Modal onOk={handleSubmitInstallment} open={openInstallmentsModal} onCancel={() => setOpenInstallmentsModal(false)} okText={installmentAddLoading ? t("loadingText") : t("addText")}  cancelText={t("cancelText")} onClose={() => setOpenInstallmentsModal(false)} title="">
         <div className="flex flex-col gap-3">
            <div className="input-group">
              <label>{t("installmentTitle")}</label>
              <input required type="text" onChange={(e) => setInstallmentData({...installmentData , installment_title : e.target.value})} value={installmentData.installment_title}/>
            </div>

            <div className="input-group">
              <label>{t("installment_number")}</label>
              <input required type="text" onChange={(e) => setInstallmentData({...installmentData , installment_number: e.target.value})} value={installmentData.installment_number}/>
            </div>
         </div>
         </Modal>

      <Modal
        open={assignModal}
        onCancel={() => setAssignModal(false)}
        onClose={() => setAssignModal(false)}
        footer={null}
        title="Assign Products to Section"
      >
        <form className="flex flex-col gap-3">
          <div className="input-group">
            <label>Products</label>
            <select>
              <option disabled selected>
                Select...
              </option>
              <option>test 1</option>
              <option>test 2</option>
            </select>
          </div>

          <button className="bg-[#0d6efd] text-white rounded-md flex p-2 justify-center items-center w-full">
            Save
          </button>
        </form>
      </Modal>

      <DeleteInstallmentCategoryModal 
       rowData={rowData}
       setRowData={setRowData}
       deleteInstallmentModal={removeInstallmentModal}
       setDeleteInstallmentModal={setRemoveInstallmentModal}
       setInstallmentRowData={setInstallmentRowData}
       installmentRowData={installmentRowData}
      />

      <EditInstallmentCategoryModal 
       editInstallmentCategoryModal={editInstallmentModal}
       setEditInstallmentCategoryModal={setEditInstallmentModal}
      rowData={rowData}
      setRowData= {setRowData}
      installmentRowData={installmentRowData}
      setInstallmentRowData={setInstallmentRowData}
      />

      <EditCategoryModal  
      editModal={editModal} 
      setEditModal={setEditModal}
      rowData={rowData}
      setRowData={setRowData}
      imgs={imgs}
      setImgs={setImgs}
      selectedInputs ={selectedInputs}
      setSelectedInputs={setSelectedInputs}
      setOpenInstallmentsModal={setOpenInstallmentsModal}
      installmentData={installmentData}
      setInstallmentData={setInstallmentData}
      />

      <AddCategoryModal 
       imgs={imgs}
       setImgs={setImgs}
       setOpenAddModal={setOpenAddModal}
       openAddModal={openAddModal}
       selectedInputs={selectedInputs}
       setSelectedInputs={setSelectedInputs}
       productSectionData={productSectionData}
       setProductSectionData={setProductSectionData}
       setOpenInstallmentsModal={setOpenInstallmentsModal}
      
      />
     
      <input placeholder={t("searchText")}  onChange={(e) => setSearchVal(e.target.value)} className="my-3 border border-gray-200 outline-hidden p-3 rounded-md w-full"/>
      {loading ? <div className="h-screen flex justify-center items-center"><Spin size="large"/></div> : <Table scroll={{x : "max-content"}} columns={columns} dataSource={data?.data?.categories ||[]} />}
    </div>
  );
}
