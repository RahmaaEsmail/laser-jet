import { Modal, Table } from "antd";
import React, { useState } from "react";

export default function ProductOrder() {
    const [showPhotoModal , setShowPhotoModal] = useState(false);
    const [rowData , setRowData] = useState({});
    const columns = [
        {
            dataIndex:"id",
            key:"id",
            title:"#",
        },
        {
            dataIndex:"title",
            key:"title",
            title:"Title"
        },
        {
            dataIndex:"desc",
            key:"desc",
            title:"Description",
        },
        {
            dataIndex:"prod_code",
            key:"prod_code",
            title:"Product Code",
        },
        {
            dataIndex:"quantity",
            key:"quantity",
            title:"Quantity",
        },
        {
            dataIndex:"payment_method",
            key:"payment_method",
            title:"Payment Method",
        },
        {
            dataIndex:"amount",
            key:"amount",
            title:"Amount",
        },
        {
            dataIndex:"photos",
            key:"photos",
            title:"Photos",
            render:(row) => <button onClick={() => {
                setShowPhotoModal(true)
                setRowData(row)
            }} className="bg-[#0d6efd] text-white flex justify-center items-center p-3 rounded-md">Show Photos</button>
        }
    ]
  return (
    <div>
      <h3 className="font-semibold text-[25px] text-[#0d6efd]">
        Order Products
      </h3>

      <Modal open={showPhotoModal} onClose={() => setShowPhotoModal(false)} onCancel={() => setShowPhotoModal(false)} footer={null} title="Show Photos">
        <div className="grid grid-cols-3 gap-3">
            {rowData?.photos?.length > 0 && rowData?.photos?.map((item , index) => <img className="w-[100px] h-[100px] object-cover rounded-md" key={index} src={item}/>)}
            {rowData?.photos?.length <= 0 && <p className="text-center font-medium">No Photos Available</p> }
        </div>
      </Modal>

      <Table  columns={columns} />
    </div>
  );
}
