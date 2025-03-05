import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import { createUser, fetchUsers, updateUser } from "../../../features/usersSlice";
import { useTranslation } from "react-i18next";

export default function EditUserModal({ open, setOpen , rowData , setRowData }) {
    const { editLoading } = useSelector(state => state.users);
    const dispatch = useDispatch()
    const {t} = useTranslation();
    console.log(rowData)

    // function handleSubmit(e) {
    //     e.preventDefault();
        
    //     if (!rowData.name) {
    //         toast.warn("برجاء ادخال الاسم اولا!");
    //         return;
    //     }
    //     if (!rowData.password) {
    //         toast.warn("برجاء ادخال كلمه السر اولا!");
    //         return;
    //     }
    //     if (!rowData.phone) {
    //         toast.warn("برجاء ادخال   رقم الهاتف اولا !");
    //         return;
    //     }



    //     const formData = new FormData();
    //     formData.append("username", userData.name);
    //     formData.append("password", userData.password);
    //     formData.append("phone", userData.phone);
    //     const data_send = {username:rowData.name,password:rowData.password ,phone:rowData.phone}
    //     dispatch(updateUser(data_send)).then(res => {
    //         console.log(res)
    //         if (res?.payload?.success) {
    //             toast.success(res?.payload?.message)
    //             dispatch(fetchUsers())
    //             setOpen(false)
    //             setRowData({})

    //         } else {
    //             toast.error(res?.payload?.message || "There's error while creating employee")
    //         }
    //     }).catch(e => console.log(e))
    // }
    return (
        <Modal
            title={t("editUserText")}
            open={open}
            setOpen={setOpen}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
            footer={null}
        >
            <form  className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="w-full input-group ">
                        <label>{t("fullName")}</label>
                        <input
                            value={rowData.username}
                            onChange={(e) => setRowData({...rowData,name:e.target.value})}
                            type="text"
                            placeholder={t("fullName")}
                        />
                    </div>

                    <div className="w-full input-group ">
                        <label>{t("phone")}</label>
                        <input
                            value={rowData?.phone}
                            onChange={(e) =>
                                setRowData({ ...rowData, phone: e.target.value })
                            }
                            type="tel"
                            placeholder={t("phone")}
                            className=""
                        />
                    </div>
                </div>


                <div className="w-full input-group ">
                    <label>{t("password")}</label>
                    <input
                        value={rowData?.password}
                        onChange={(e) =>
                            setRowData({ ...rowData, password: e.target.value })
                        }
                        type="password"
                        placeholder="**********"
                    />
                </div>

                <button className="bg-[#0d6efd] hover:bg-[#104ba3]  text-white p-2 rounded-sm w-full">{editLoading ? t("loadingText") : t("saveBtn")}</button>
            </form>
        </Modal>
    );
}
