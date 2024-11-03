import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Typography, Card, message } from 'antd';
import CardTableProfile from '../Component/cardTableProfile';
import LanguageSelector from '../Component/LanguageSelector';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const { Title } = Typography;

const Profile = () => {
  const {t} = useTranslation();
  const [profile, setProfile] = useState({
    id: -1,
    firstName: '',
    lastName: '',
    email: ''
  });

  const [Guides, setGuides] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users/me',
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      console.log(response.data);
      const data = response.data.data.user;
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error(error);
    };
  }

  async function getGuides() {
    if (profile.id === -1) return;
    try {
      const response = await axios.get('/api/guidelines',
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      setGuides(response.data.data.guidelines);
    } catch (error) {
      console.error(error);
      message.error('An error occurred when retrieving the guides');
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.id !== -1) getGuides();
  }, [profile]);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' }
  ];

  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-10 space-y-10'>
      <Card
        bordered
        title={t("pages.profile.title")}
        className='w-4/5'
      >
        <Form layout="vertical">
          <Form.Item label={t("pages.profile.firstname")}>
            <Input value={profile?.firstName} readOnly />
          </Form.Item>
          <Form.Item label={t("pages.profile.lastname")}>
            <Input value={profile?.lastName} readOnly />
          </Form.Item>
          <Form.Item label={t("pages.profile.email")}>
            <Input value={profile?.email} readOnly />
          </Form.Item>
          <LanguageSelector/>
        </Form>
      </Card>

      <CardTableProfile Guides={Guides} currentUser={profile} />
    </div>
  );
};

export default Profile;
