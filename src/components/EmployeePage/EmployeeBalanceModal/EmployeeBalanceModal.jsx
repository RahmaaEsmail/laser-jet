import { Modal, Switch } from "antd";
import { useState } from "react";

export default function EmployeeBalanceModal({ open, setOpen, userId = 0 }) {
  const [userData, setUserData] = useState({
    account_balance: 0,
    available_balance: 0,
    max_limit_per_month: null,
    investment_balance: false,
    deduction_ratio: 0,
    investment_balance_true: 0,
    deduction_ratio_true: 0,
  });
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      footer={null}
      title="Edit User Balance"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="input-group">
            <label>Account Balance</label>
            <input
              value={userData?.account_balance}
              onChange={(e) =>
                setUserData({ ...userData, account_balance: e.target.value })
              }
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </div>

          <div className="input-group">
            <label>Available Balance</label>
            <input
              value={userData?.available_balance}
              onChange={(e) =>
                setUserData({ ...userData, available_balance: e.target.value })
              }
              type="number"
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Max Limit Per Month</label>
          <input
            value={userData?.max_limit_per_month}
            onChange={(e) =>
              setUserData({ ...userData, max_limit_per_month: e.target.value })
            }
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Switch
            checked={userData?.investment_balance}
            onChange={(e) =>
              setUserData({ ...userData, investment_balance: e })
            }
          />
          <p className="text-[16px] text-gray-600">
            Investment Balance :{" "}
            {userData?.investment_balance ? "Activated" : "Deactivated"}{" "}
          </p>
        </div>

        {!userData?.investment_balance && (
          <div className="input-group">
            <label>Deduction Ratio (Percent)</label>
            <input
              type="number"
              value={userData?.deduction_ratio}
              onChange={(e) =>
                setUserData({ ...userData, deduction_ratio: e.target.value })
              }
              onWheel={(e) => e.target.blur()}
            />
          </div>
        )}

        {userData?.investment_balance && (
          <div className="grid grid-cols-2 gap-3">
            <div className="input-group">
              <label>Investment Balance</label>
              <input
                type="number"
                value={userData?.investment_balance_true}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    investment_balance_true: e.targe.value,
                  })
                }
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div className="input-group">
              <label>Deduction Ratio (Percent)</label>
              <input
                type="number"
                value={userData?.deduction_ratio_true}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    deduction_ratio_true: e.target.value,
                  })
                }
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>
        )}

        <button className="mt-3 bg-[#0d6efd] hover:bg-[#104ba3]  p-2 rounded-md text-white flex justify-center items-center">
          Save
        </button>
      </div>
    </Modal>
  );
}
