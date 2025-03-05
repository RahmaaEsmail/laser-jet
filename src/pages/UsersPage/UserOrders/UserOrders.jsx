import { Table } from "antd";
import { useTranslation } from "react-i18next";

export default function UserOrders() {
    const {t} = useTranslation();
    const columns = [
        {
            dataIndex:"id",
            key:"id",
            title:"#"
        },
        {
            dataIndex:"رقم الاوردر",
            key:"رقم الاوردر",
            title:t("orderNo")
        },
        {
            dataIndex:"",
            key:"",
            title:t("actions"),
            render:(row) => {
                return (
                    <div className="">
                        <button className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center">{t("invoiceText")}</button>
                    </div>
                )
            }
        }
    ]
  return (
    <div>
         <h3 className="font-semibold text-[25px] text-[#0d6efd]">
           {t("clientOrders")}
        </h3>

        <input placeholder={t("searchText")} className='border border-gray-200 outline-hidden w-full rounded-md p-3 my-3' />
        <Table columns={columns}/>
    </div>
  )
}
