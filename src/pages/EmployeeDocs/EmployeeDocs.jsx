import { Modal, Table } from "antd";
import { useState } from "react";
import { FcFile } from "react-icons/fc";

const data = [
  {
    id: 1,
    paper_name: "paper 1",
    paper_image: "https://laserjet-8405a.web.app/media/logos/logo.png",
  },
];

export default function EmployeeDocs() {
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [docsData, setDocsData] = useState({
    name: "",
    file: null,
  });
  const columns = [
    {
      dataIndex: "id",
      key: "هي",
      title: "#",
    },
    {
      dataIndex: "paper_name",
      key: "paper_name",
      title: "Paper Name",
    },
    {
      dataIndex: "paper_image",
      key: "paper_image",
      title: "Paper Image",
      render: (row) => (
        <img
          src={row}
          className="w-[100px] h-[100px] rounded-md object-cover"
        />
      ),
    },
    {
      dataIndex: "",
      key: "",
      title: "Pdf",
      render: (row, text) => (
        <a href={`${row?.pdf}`} target="_blank">
          <FcFile className="text-[23px]" />
        </a>
      ),
    },
    {
      title: "Actions",
      render: (row) => (
        <button className="bg-red-700 text-white p-2 rounded-md flex justify-center items-center">
          Remove
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="flex gap-3 justify-between my-4">
        <h3 className="font-semibold text-[25px] text-[#0d6efd]">
          Employees Docs
        </h3>
        <button
          onClick={() => setAddOpenModal(true)}
          className="bg-[#0d6efd] text-white rounded-md p-3 flex justify-center items-center"
        >
          Add Docs
        </button>
      </div>

      <Modal
        open={addOpenModal}
        onClose={() => setAddOpenModal(false)}
        onCancel={() => setAddOpenModal(false)}
        title="Add Docs"
        footer={null}
      >
        <form className="flex flex-col gap-3">
          <div className="input-group">
            <label>Paper Name Label</label>
            <input
              value={docsData?.name}
              onChange={(e) =>
                setDocsData({ ...docsData, name: e.target.value })
              }
              type="text"
            />
          </div>

          <div className="input-group">
            <label>Paper File</label>
            <input
              type="file"
              onChange={(e) =>
                setDocsData({ ...docsData, file: e.target.files[0] })
              }
            />
          </div>

          <button className="bg-[#0d6efd] mt-3 w-full hover:bg-[#104ba3]  text-white p-2 rounded-sm">
            Save
          </button>
        </form>
      </Modal>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
