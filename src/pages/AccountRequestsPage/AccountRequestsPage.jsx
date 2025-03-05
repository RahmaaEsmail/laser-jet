import { Modal, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa6";

const data = [
    {
        id:1,
        name:"rahma",
        phone:"01205930760",
        status:"pending",
        nationalId:"0927828789",
        imgUrl:""
    },
    {
        id:2,
        name:"mahmoud",
        phone:"01205930760",
        status:"declined",
        nationalId:"0927828789",
        imgUrl:""
    },
    {
        id:3,
        name:"ahmed",
        phone:"01205930760",
        status:"accepted",
        nationalId:"0927828789",
        imgUrl:""
    }
]

export default function AccountRequestsPage() {
    const [viewModal ,setViewModal] = useState(false);
    const {t} = useTranslation();
    const [imgs , setImgs ]= useState({
        file:null,
        url:"",
    })
    const [deletModal ,setDeleteModal] = useState(false);
    const [rowData , setRowData] = useState({});
    const columns = [
        {
            dataIndex:"id",
            key:"id",
            title:"#"
        },
        {
            dataIndex:"name",
            key:"name",
            title:t("fullName")
        },
        {
            dataIndex:"phone",
            key:"phone",
            title:t("phone"),
        },
        {
            dataIndex:"",
            key:"",
            title:t("status"),
            render:(row , text) => <p className={`${row?.status == "pending" ? "text-gray-500" : row?.status == "accepted" ?"text-green-500" : "text-red-500"}`}>{row?.status}</p>
        },
        {
            dataIndex:"",
            key:"",
            title:t("actions"),
            render:(row , text) => <div className="flex gap-3 items-center">
                <button onClick={() => {
                    setViewModal(true)
                    setRowData(row)
                }} className="bg-[#0d6efd] text-white rounded-md flex justify-between p-3">{t("viewText")}</button>
                <button onClick={() => setDeleteModal(true)} className="bg-red-500 text-white rounded-md flex justify-between p-3">{t("deleteText")}</button>
            </div>
        }
    ]

    function handleSave() {
        const data_send = {
            ...rowData,
            imgfile: imgs?.file
        }

    }

  return (
    <div>
        <div className="flex justify-between items-center">
        <h3 className='font-semibold text-[25px] text-[#0d6efd]'>{t("accountRequests")}</h3>
        <button className="text-white bg-blue-600 p-2 border border-(--main-color) rounded-md">{t("addText")}</button>
        </div>
         <Modal open={viewModal} onCancel={() => setViewModal(false)} onClose={() => setViewModal(false)} title="View Account Request" footer={null}>
            <div  className="flex flex-col gap-3">
               <div className="grid grid-cols-2 gap-3">
               <div className="input-group">
                <label>{t("fullName")}</label>
                  <input type="text" value={rowData?.name} onChange={(e) => setRowData({...rowData,name:e.target.value})}/>
               </div>

               <div className="input-group">
                <label>{t("phone")}</label>
                  <input type="tel" value={rowData?.phone} onChange={(e) => setRowData({...rowData,phone:e.target.value})}/>
               </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
               <div className="input-group">
                <label>{t("nationalId")}</label>
                  <input type="text" value={rowData?.nationalId} onChange={(e) => setRowData({...rowData,nationalId:e.target.value})}/>
               </div>

               <div className="input-group">
                <label>{t("statusText")}</label>
                  <input className="disabled:bg-gray-200" type="text" value={rowData?.status} disabled/>
               </div>
               </div>


               <div className="input-group">
                <label>{t("identityImageText")} </label>
                <input onChange={(e) => setImgs({
                    file:e.target.files[0],
                    url:URL.createObjectURL(e.target.files[0])
                })}  type="file" accept="image/*"/>
               </div>

               {rowData?.imgUrl && <div className="flex gap-3 items-center">
                   <img src={rowData?.imgUrl} className="w-[100px] h-[100px] object-contain rounded-md"/>
                   <FaTrash className="text-red-500"/>
                 </div>}

               <div className="flex gap-3 items-center mt-3">
                 <button className="bg-green-800 hover:bg-green-900 text-white p-2 rounded-sm" onClick={handleSave}>{t("saveBtn")}</button>
                 <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-sm" onClick={() => setViewModal(false)}>{t("cancelText")}</button>
               </div>
            </div>
         </Modal>

         <Modal open={deletModal} onClose={() => setDeleteModal(false)} onCancel={() => setDeleteModal(false)} footer={null}>
            <h2 className="font-medium text-[20px]">{t("deleteRequestText")}</h2>
            <div className="flex gap-3 items-center mt-3">
                <button className="bg-red-700 text-white p-2 rounded-md">{t("saveBtn")}</button>
                <button className="text-blue-600 p-2 border border-(--main-color) rounded-md" onClick={() => setDeleteModal(false)}>{t("cancelText")}</button>
            </div>
         </Modal>

         <input type="text" placeholder={t("searchText")} className="w-full rounded-md p-3 border border-gray-300 outline-hidden my-4"/>
        <Table columns={columns}  dataSource={data}/>
    </div>
  )
}
