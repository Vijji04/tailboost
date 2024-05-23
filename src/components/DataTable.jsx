import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://freetestapi.com/api/v1/students?limit=20')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: address => `${address.street}, ${address.city}, ${address.zip}, ${address.country}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
      render: courses => courses.join(', '),
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} alt="Student" style={{ width: '50px' }} />,
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />;
};

export default DataTable;