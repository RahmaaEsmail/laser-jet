import { Table } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Invoices() {
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
            title:t("nameText")
        },
        {
            dataIndex:"phone",
            key:"phone",
            title:t("phone")
        },
        {
            dataIndex:"value",
            key:"value",
            title:t("valueText")
        },
        {
            dataIndex:"support_acc",
            key:"support_acc",
            title: t("supportAccText")
        },
        {
            dataIndex:"client_phone",
            key:"client_phone",
            title: t("clientPhoneText")
        },
        {
            dataIndex:"date",
            key:"date",
            title:t("dateText")
        },
        {
            dataIndex:"",
            key:"",
            title:t("actions"),
            render:(row) => {
                return (
                    <button>{t("previewText")}</button>
                )
            }
        }
    ]
  return (
    <div>
        <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">{t("InvoicesText")}</h3>
      </div>

      <input placeholder={t("searchText")} className='border border-gray-200 outline-hidden w-full rounded-md p-3 my-3' />
      <Table columns={columns}/>
    </div>
  )
}
