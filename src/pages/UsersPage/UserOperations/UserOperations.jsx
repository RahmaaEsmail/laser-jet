import { Dropdown, Menu, Space, Table } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaEllipsisVertical } from 'react-icons/fa6'

export default function UserOperations() {
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
            title:t("nameText"),
        },
        {
            title:t("actions"),
            render:(row) => {
                const menu = (
                    <Menu className='flex flex-col gap-1 !p-2'>
                        <Menu.Item>{t("detailsText")}</Menu.Item>
                    </Menu>
                )
                return (
                    <Dropdown>
                        <Space>
                            <FaEllipsisVertical />
                        </Space>
                    </Dropdown>
                )
            }
        }
    ]
  return (
    <div>
      <input
        type="text"
        placeholder={t("searchText")}
        className="my-3 border border-gray-300 p-3 w-full rounded-md outline-none"
      />
      <Table columns={columns} dataSource={[]} rowKey="id" />
    </div>
  )
}
