import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployees, employeesSlcie, fetchEmployees } from "../../../features/employeesSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";

export default function AddEmployeeModal({ open, setOpen }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    phone: "",
    password: "",
    confrimPass: "",
    nationalId: "",
    address: "",
    user: "",
    email:""
  });
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });
  const {addLoading , addEmployeesData} = useSelector(state => state.employees);
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault();

    if(!employeeData.name) {
      toast.warn("برجاء ادخال الاسم اولا!");
      return;
    }
    if(!employeeData.password) {
      toast.warn("برجاء ادخال كلمه السر اولا!");
      return;
    }

    if(!employeeData.email) {
      toast.warn("برجاء ادخال البريد الالكتروني اولا!");
      return;
    }

    if(!employeeData.nationalId) {
      toast.warn("برجاء ادخال الباسبورد اولا!");
      return;
    }

    if(!employeeData.user) {
      toast.warn("برجاء اختيار role اولا!");
      return;
    }

    const formData  = new FormData();
    formData.append("username",employeeData.name);
    formData.append("password",employeeData.password);
    formData.append("phone",employeeData.phone);
    formData.append("email",employeeData.email)
    formData.append("national_id",employeeData.nationalId);
    formData.append("role",employeeData.user);
    formData.append("identity_image",imgs.file);
    formData.append("address",employeeData.address)
    console.log(formData.get("address"))
    dispatch(createEmployees(formData)).then(res => {
      console.log(res)
      if(res?.payload?.success) {
        toast.success(res?.payload?.message)
        dispatch(fetchEmployees())
        setOpen(false)
        setEmployeeData({
          name: "",
          phone: "",
          password: "",
          confrimPass: "",
          nationalId: "",
          address: "",
          user: "",
          email:""
        })
        setImgs({
          file:null,
          url:""
        })
      }else {
       toast.error(res?.payload?.message || "There's error while creating employee")
      }
    }).catch(e => console.log(e))
  }
  return (
    <Modal
      title="Add Employee"
      open={open}
      setOpen={setOpen}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      footer={null}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="w-full input-group ">
            <label>Full Name</label>
            <input
              value={employeeData?.name}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, name: e.target.value })
              }
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="w-full input-group ">
            <label>Phone Number</label>
            <input
              value={employeeData?.phone}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, phone: e.target.value })
              }
              type="tel"
              placeholder="Phone Number"
              className=""
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="w-full input-group ">
            <label>Password</label>
            <input
              value={employeeData?.password}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, password: e.target.value })
              }
              type="password"
              placeholder="**********"
            />
          </div>
          <div className="input-group">
           <label>البريد الالكتروني</label>
           <input type="email" value={employeeData.email} onChange={(e) => setEmployeeData({...employeeData,email:e.target.value})}/>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="w-full input-group ">
            <label>National ID / Passport</label>
            <input
              value={employeeData?.nationalId}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, nationalId: e.target.value })
              }
              type="text"
              placeholder="National ID / Passport"
            />
          </div>

          <div className="w-full input-group ">
            <label>Address (Optional)</label>
            <input
              value={employeeData?.address}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, address: e.target.value })
              }
              type="text"
              placeholder="Address"
              className=""
            />
          </div>
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            value={employeeData.user}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, user: e.target.value })
            }
          >
            <option disabled value={""} selected>
              Choose option
            </option>
            <option value={"admin"}>Admin</option>
            <option value="editor">Editor</option>
            <option value="sales_manager">Sales Manager</option>
          </select>
        </div>


        <div className="input-group">
          <label>Identity Photo (Optional)</label>
          <input
            accept="image/*"
            onChange={(e) =>
              setImgs({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              })
            }
            type="file"
          />
        </div>

        {imgs?.url && (
          <div className="flex items-center gap-3">
            <img
              src={imgs?.url}
              className="w-[100px] h-[100px] object-contain rounded-sm"
            />
            <FaTrash
              className="text-red-500"
              onClick={() =>
                setImgs({
                  file: null,
                  url: "",
                })
              }
            />
          </div>
        )}

        <button className="bg-[#0d6efd] hover:bg-[#104ba3]  text-white p-2 rounded-sm w-full">{addLoading ? "Loading...":"Save"}</button>
      </form>
    </Modal>
  );
}
