import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const EditTransactionModal = ({
  editingTransaction,
  setEditingTransaction,
  updateTransaction,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTransaction) {
      form.setFieldsValue({
        ...editingTransaction,
        date: moment(editingTransaction.date),
      });
    }
  }, [editingTransaction, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedTransaction = {
          ...values,
          date: values.date.format("YYYY-MM-DD"),
          amount: parseFloat(values.amount),
        };
        updateTransaction(editingTransaction.id, updatedTransaction);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setEditingTransaction(null);
  };

  return (
    <Modal
      title="Edit Transaction"
      open={!!editingTransaction}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Transaction Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Transaction Type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select placeholder="Select type">
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please choose a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="tag"
          label="Tag"
          rules={[{ required: true, message: "Please enter a tag" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTransactionModal;
