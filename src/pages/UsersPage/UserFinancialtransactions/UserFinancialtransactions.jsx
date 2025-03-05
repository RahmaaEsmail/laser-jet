import React, { useState } from "react";
import UsersBalance from "../UserBalances/UserBalances";
import UserInstallments from "../UserInstallments/UserInstallments";
import UserDeductions from "../UserDeductions/UserDeductions";
import UserOperations from "../UserOperations/UserOperations";
import { useTranslation } from "react-i18next";


export default function UserFinancialtransactions() {
  const [tabs, setTabs] = useState(1);
  const {t} = useTranslation()
  const TABS = [
    {
      id: 1,
      nameAr: t("accountBalanceText"),
    },
    {
      id: 2,
      nameAr: t("InstallmentsText"),
    },
    {
      id: 3,
      nameAr: t("discountText"),
    },
    {
      id: 4,
      nameAr: t("operationText"),
    },
  ];
  return (
    <div>
      <h3 className="text-center my-5 text-[23px] text-[#0d6efd] font-bold">
        {t("financeTransactionsText")}
      </h3>
      <div className="flex gap-3 items-center">
        {TABS.map((item) => (
          <button
            className={`p-3 border border-[#0d6efd] rounded-md flex justify-center items-center ${
              tabs == item?.id
                ? "bg-[#0d6efd] text-white"
                : "bg-transparent text-[#0d6efd]"
            }`}
            key={item?.id}
            onClick={() => setTabs(item?.id)}
          >
            {item?.nameAr}
          </button>
        ))}
        {/* <button className={`p-3 border border-[#0d6efd] ${tabs == 0}`} onClick={() => setTabs(0)}>رصيد الحساب</button> */}
      </div>

      {tabs == 1 && <UsersBalance />}
      {tabs == 2 && <UserInstallments />}
      {tabs == 3 && <UserDeductions />}
      {tabs == 4 && <UserOperations />}
    </div>
  );
}
