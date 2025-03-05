import React, { useState } from 'react';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    title: 'العملاء',
    value: 'clients',
    key: 'clients',
    children: [
      {
        title: 'عرض العملاء',
        value: 'clients-show',
        key: 'clients-show',
      },
      {
        title: 'ارسال الرصيد',
        value: 'clients-money',
        key: 'clients-money',
      },
      {
        title: 'اضافة عميل',
        value: 'clients-add',
        key: 'clients-add',
      },
      {
        title: 'تعديل عميل',
        value: 'clients-edit',
        key: 'clients-edit',
      },
      {
        title:"طلبات الحسابات",
        key:"clients-order",
        value:"clients-order",
        children : [
            {
                title:"عرض الطلبات",
                key:"clients-order-show",
                value:"clients-order-show"
            },
            {
                title:"حذف الطلبات",
                key:"clients-order-delete",
                value:"clients-order-delete"
            },
            {
                title:"تعديل الطلبات",
                key:"clients-order-edit",
                value:"clients-order-edit"
            }
        ]
      }
    ],
  },
  {
    title:"العمليات",
    key:"operations",
    value:"operations",
  },
  {
    title:"خصومات المستخدمين",
    key:"user_discount",
    value:"user_discount"
  }
];
const MultiSelect = () => {
  const [value, setValue] = useState('');
  const onChange = (newValue) => {
    console.log('onChange ', newValue);
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  return <TreeSelect {...tProps} />;
};
export default MultiSelect;