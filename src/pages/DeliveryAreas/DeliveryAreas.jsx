import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function DeliveryAreas() {
    const [addModal , setAddModal] = useState(false);
    const [rowData , setRowData] = useState({});
    const [editModal , setEditModal] = useState(false);
    const {t} = useTranslation();
    const columns = [
        {
            dataIndex:"id",
            key:"id",
            title:"#"
        },
        {
            dataIndex:"name",
            key:"name",
            title:t("username")
        },
        {
            dataIndex:"description",
            key:"description",
            title:t("description")
        },
        {
            dataIndex:"shipping_price",
            key:"shipping_price",
            title: t("shippingPriceText")
        },
    ]

    
  return (
    <div>
        <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">{t("deliveryAreaText")}</h3>
        <button
          onClick={() => setAddModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center"
        >
          {t("addText")}
        </button>
      </div>

      <Modal open={addModal} onCancel={() => setAddModal(false)} onClose={() => setAddModal(false)} title="انشاء منطقة توصيل" footer={null}>
          <form>
             <div className='input-group'>
                <label>{t("nameText")}</label>
                <input type="text"/>
             </div>

             <div className='input-group'>
                <label>{t("description")}</label>
                <input type="text"/>
             </div>

             <div className='input-group'>
                <label>{t("shippingPriceText")}</label>
                <input type="text"/>
             </div>

             <button className="bg-[#0d6efd] text-white w-full p-2 rounded-md mt-3">{t("saveBtn")}</button>
          </form>
      </Modal>

      <input placeholder={t("searchText")} className='border border-gray-200 outline-hidden w-full rounded-md p-3 my-3' />
      <Table columns={columns} />
    </div>
  )
}
