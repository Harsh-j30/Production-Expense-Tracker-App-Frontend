// import React, { useState, useEffect } from "react";
// import Layout from "../Components/Layout/Layout";
// import {
//   Form,
//   Modal,
//   Input,
//   Select,
//   message,
//   Table,
//   DatePicker,
// } from "antd";
// import {
//   UnorderedListOutlined,
//   AreaChartOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import Spinner from "../Components/Spinner";
// import axios from "axios";
// import moment from "moment";
// import Analytics from "../Components/Analytics";

// const { RangePicker } = DatePicker;

// const HomePage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [allTransection, setAllTransection] = useState([]);
//   const [frequencyy, setFrequencyy] = useState("7");
//   const [selectedDate, setSelectedDate] = useState([]);
//   const [type, setType] = useState("all");
//   const [viewData, setViewData] = useState("table");
//   const [edittable, setEdittable] = useState(null);
//   const [form] = Form.useForm();

//   // ===================== TABLE COLUMNS =====================
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//     },
//     {
//       title: "Reference",
//       dataIndex: "refrence",
//     },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <div>
//           <EditOutlined
//             className="mx-2"
//             onClick={() => {
//               setEdittable(record);
//               setShowModal(true);
//             }}
//           />
//           <DeleteOutlined
//             className="mx-2"
//             onClick={() => handleDelete(record)}
//           />
//         </div>
//       ),
//     },
//   ];

//   // ===================== FETCH TRANSACTIONS =====================
//   const getAllTransections = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       setLoading(true);

//    const res = await axios.post(
//   `${process.env.REACT_APP_API_URL}/api/v1/transections/get-transection`,
//   {
//     userid: user.user._id,
//     frequencyy,
//     selectedDate,
//     type,
//   }
// );

//       setAllTransection(res.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       message.error("Failed to fetch transactions");
//     }
//   };

//   // ===================== USE EFFECT =====================
//   useEffect(() => {
//     getAllTransections();
//   }, [frequencyy, selectedDate, type]);

//   // ===================== DELETE =====================
//   const handleDelete = async (record) => {
//     try {
//       setLoading(true);
//      await axios.post(
//        `${process.env.REACT_APP_API_URL}/api/v1/transections/delete-transection`,
//        {
//          transactionId: record._id,
//        }
//      );


//       message.success("Transaction Deleted Successfully");
//       getAllTransections(); // 🔥 refresh UI
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       message.error("Failed to delete transaction");
//     }
//   };

//   // ===================== ADD / EDIT =====================
//   const handleSubmit = async (values) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       setLoading(true);

//       if (edittable) {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/v1/transections/edit-transection`,
//         {
//           transactionId: edittable._id,
//           payload: { ...values, userId: user.user._id },
//         }
//       );

//         message.success("Transaction Updated Successfully");
//       } else {
//        await axios.post(
//          `${process.env.REACT_APP_API_URL}/api/v1/transections/add-transection`,
//          {
//            ...values,
//            userid: user.user._id,
//          }
//        );

//         message.success("Transaction Added Successfully");
//       }

//       setShowModal(false);
//       setEdittable(null);
//       form.resetFields();

//       getAllTransections(); // 🔥 refresh UI
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       message.error("Failed to save transaction");
//     }
//   };

//   // ===================== UI =====================
//   return (
//     <Layout>
//       {loading && <Spinner />}

//       <div className="filters">
//         <div>
//           <h6>Select Frequency</h6>
//           <Select value={frequencyy} onChange={setFrequencyy}>
//             <Select.Option value="7">LAST 1 Week</Select.Option>
//             <Select.Option value="30">LAST 1 Month</Select.Option>
//             <Select.Option value="365">LAST 1 Year</Select.Option>
//             <Select.Option value="custom">Custom</Select.Option>
//           </Select>

//           {frequencyy === "custom" && (
//             <RangePicker
//               value={selectedDate}
//               onChange={setSelectedDate}
//             />
//           )}
//         </div>

//         <div>
//           <h6>Select Type</h6>
//           <Select value={type} onChange={setType}>
//             <Select.Option value="all">All</Select.Option>
//             <Select.Option value="income">Income</Select.Option>
//             <Select.Option value="expense">Expense</Select.Option>
//           </Select>
//         </div>

//         <div className="switch-icons">
//           <UnorderedListOutlined
//             className={`mx-2 ${
//               viewData === "table" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("table")}
//           />
//           <AreaChartOutlined
//             className={`mx-2 ${
//               viewData === "analytics" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("analytics")}
//           />
//         </div>

//         <button
//           className="btn btn-primary"
//           onClick={() => setShowModal(true)}
//         >
//           Add New
//         </button>
//       </div>

//       <div className="content">
//         {viewData === "table" ? (
//           <Table columns={columns} dataSource={allTransection} rowKey="_id" />
//         ) : (
//           <Analytics allTransection={allTransection} />
//         )}
//       </div>

//       {/* ===================== MODAL ===================== */}
//       <Modal
//         title={edittable ? "Edit Transaction" : "Add Transaction"}
//         open={showModal}
//         onCancel={() => {
//           setShowModal(false);
//           setEdittable(null);
//           form.resetFields();
//         }}
//         footer={false}
//       >
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={handleSubmit}
//           initialValues={edittable}
//         >
//           <Form.Item label="Amount" name="amount" required>
//             <Input type="number" />
//           </Form.Item>

//           <Form.Item label="Type" name="type" required>
//             <Select>
//               <Select.Option value="income">Income</Select.Option>
//               <Select.Option value="expense">Expense</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item label="Category" name="category" required>
//             <Select>
//               <Select.Option value="salary">Salary</Select.Option>
//               <Select.Option value="food">Food</Select.Option>
//               <Select.Option value="bills">Bills</Select.Option>
//               <Select.Option value="medical">Medical</Select.Option>
//               <Select.Option value="movie">Movie</Select.Option>
//               <Select.Option value="fees">Fees</Select.Option>
//               <Select.Option value="other">Other</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item label="Date" name="date" required>
//             <Input type="date" />
//           </Form.Item>

//           <Form.Item label="Reference" name="refrence">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Description" name="description">
//             <Input />
//           </Form.Item>

//           <div className="d-flex justify-content-end">
//             <button type="submit" className="btn btn-primary">
//               SAVE
//             </button>
//           </div>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useCallback } from "react";
import Layout from "../Components/Layout/Layout";
import {
  Form,
  Modal,
  Input,
  Select,
  message,
  Table,
  DatePicker,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Spinner from "../Components/Spinner";
import axios from "axios";
import moment from "moment";
import Analytics from "../Components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequencyy, setFrequencyy] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [edittable, setEdittable] = useState(null);
  const [form] = Form.useForm();

  // ===================== TABLE COLUMNS =====================
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEdittable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  // ===================== FETCH TRANSACTIONS =====================
  const getAllTransections = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/transections/get-transection`,
        {
          userid: user.user._id,
          frequencyy,
          selectedDate,
          type,
        }
      );

      setAllTransection(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to fetch transactions");
    }
  }, [frequencyy, selectedDate, type]);

  // ===================== USE EFFECT =====================
  useEffect(() => {
    getAllTransections();
  }, [getAllTransections]);

  // ===================== DELETE =====================
  const handleDelete = useCallback(
    async (record) => {
      try {
        setLoading(true);

        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/transections/delete-transection`,
          {
            transactionId: record._id,
          }
        );

        message.success("Transaction Deleted Successfully");
        getAllTransections();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to delete transaction");
      }
    },
    [getAllTransections]
  );

  // ===================== ADD / EDIT =====================
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (edittable) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/transections/edit-transection`,
          {
            transactionId: edittable._id,
            payload: { ...values, userId: user.user._id },
          }
        );

        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/transections/add-transection`,
          {
            ...values,
            userid: user.user._id,
          }
        );

        message.success("Transaction Added Successfully");
      }

      setShowModal(false);
      setEdittable(null);
      form.resetFields();
      getAllTransections();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to save transaction");
    }
  };

  // ===================== UI =====================
  return (
    <Layout>
      {loading && <Spinner />}

      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequencyy} onChange={setFrequencyy}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequencyy === "custom" && (
            <RangePicker value={selectedDate} onChange={setSelectedDate} />
          )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={setType}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} rowKey="_id" />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      {/* ===================== MODAL ===================== */}
      <Modal
        title={edittable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEdittable(null);
          form.resetFields();
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={edittable}
        >
          <Form.Item label="Amount" name="amount" required>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type" required>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" required>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" required>
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="refrence">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
