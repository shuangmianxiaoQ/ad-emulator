import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const SearchForm = () => {
  // const [form] = Form.useForm();

  return (
    <Form>
      <Form.Item label="广告计划">
        <Select>
          <Option value={1}>1</Option>
        </Select>
      </Form.Item>

      <Form.Item label="调整出价">
        <Select>
          <Option value={1}>1</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
