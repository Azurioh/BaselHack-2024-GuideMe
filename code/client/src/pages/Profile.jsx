import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Typography, Card } from 'antd';

const { Title } = Typography;

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [myGuides, setMyGuides] = useState([]);
  const [likedGuides, setLikedGuides] = useState([]);
  const [savedGuides, setSavedGuides] = useState([]);

  useEffect(() => {
    setProfile({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });

    setMyGuides([
      { key: '1', title: 'Guide 1', description: 'This is my first guide' },
      { key: '2', title: 'Guide 2', description: 'This is my second guide' }
    ]);
    setLikedGuides([
      { key: '1', title: 'Liked Guide 1', description: 'This is a liked guide' },
      { key: '2', title: 'Liked Guide 2', description: 'This is another liked guide' }
    ]);
    setSavedGuides([
      { key: '1', title: 'Saved Guide 1', description: 'This is a saved guide' },
      { key: '2', title: 'Saved Guide 2', description: 'This is another saved guide' }
    ]);
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Profile Info */}
      <Card bordered style={{ marginBottom: '20px' }}>
        <Title level={3}>Profile Information</Title>
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input value={profile.firstName} readOnly />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={profile.lastName} readOnly />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={profile.email} readOnly />
          </Form.Item>
        </Form>
      </Card>

      <Card bordered style={{ marginBottom: '20px' }}>
        <Title level={4}>My Guides</Title>
        <Table dataSource={myGuides} columns={columns} pagination={{ pageSize: 5 }} />
      </Card>

      <Card bordered style={{ marginBottom: '20px' }}>
        <Title level={4}>Liked Guides</Title>
        <Table dataSource={likedGuides} columns={columns} pagination={{ pageSize: 5 }} />
      </Card>

      <Card bordered>
        <Title level={4}>Saved Guides</Title>
        <Table dataSource={savedGuides} columns={columns} pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
};

export default Profile;
