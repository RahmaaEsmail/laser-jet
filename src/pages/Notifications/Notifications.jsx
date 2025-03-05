import { TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../features/NotificationSlice";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const [tabs, setTabs] = useState(0);
  const {data,loading, error} = useSelector(state => state?.notifications);
  const dispatch = useDispatch();
  const {t} = useTranslation()
  useEffect(() =>{
    dispatch(fetchNotifications())
  } ,[dispatch])

  useEffect(() => {
    console.log(data)
  } ,[data])

  return (
    <div>
      <h3 className="font-semibold text-center text-[25px] text-[#0d6efd]">
        {t("notificationsText")}
      </h3>
      <div className="flex gap-3 items-center">
        <button
          className={`p-3 border border-[#0d6efd] rounded-md flex justify-center items-center ${
            tabs == 0
              ? "bg-[#0d6efd] text-white"
              : "bg-transparent text-[#0d6efd]"
          }`}
          onClick={() => setTabs(0)}
        >
          {t("specificUsers")}
        </button>
        <button
          className={`p-3 border border-[#0d6efd] rounded-md flex justify-center items-center ${
            tabs == 1
              ? "bg-[#0d6efd] text-white"
              : "bg-transparent text-[#0d6efd]"
          }`}
          onClick={() => setTabs(1)}
        >
          {t("everyoneText")}
        </button>
      </div>

      {tabs == 0 && (
        <div className="my-4">
          <form className="flex flex-col gap-3">
            <div className="input-group">
              <label>{t("selectUsers")}</label>
              <select></select>
              {/* <TreeSelect /> */}
            </div>

            <div className="input-group">
              <label>{t("titleText")}</label>
              <input type="text" />
            </div>

            <div className="input-group">
              <label>{t("description")}</label>
              <textarea></textarea>
            </div>

            <div className="input-group">
              <label>{t("imageText")} ({t("optionalText")})</label>
              <input type="file" />
            </div>

            <button className="bg-[#0d6efd] text-white p-4 rounded-lg w-fit">
              {t("sendText")}
            </button>
          </form>
        </div>
      )}

      {tabs == 1 && (
        <div className="my-4">
          <form className="flex flex-col gap-3">
            <div className="input-group">
              <label>{t("titleText")}</label>
              <input type="text" />
            </div>

            <div className="input-group">
              <label>{t("description")}</label>
              <textarea></textarea>
            </div>

            <div className="input-group">
              <label>{t("imageText")} ({t("optionalText")})</label>
              <input type="file" />
            </div>

            <button className="bg-[#0d6efd] text-white p-4 rounded-lg w-fit">
              {t("sendText")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
