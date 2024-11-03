import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, Card, Radio } from 'antd';
import MyTable from './table';
import { useTranslation } from 'react-i18next';

const CardTableProfile = ({ Guides, currentUser }) => {
  const {t} = useTranslation();
  const [currentFilter, setCurrentFilter] = useState(t("components.table_profile.guides"));
  const [myGuides, setMyGuides] = useState([]);
  const [likedGuides, setLikedGuides] = useState([]);
  const [savedGuides, setSavedGuides] = useState([]);

  useEffect(() => {
    Guides.forEach((guide) => {
      if (guide.author.id === currentUser.id)
        setMyGuides([...myGuides, guide]);
      if (currentUser.likedGuides.includes(guide.id))
        setLikedGuides([...likedGuides, guide]);
      if (currentUser.savedGuides.includes(guide.id))
        setSavedGuides([...savedGuides, guide]);
    });
  }, [Guides, currentUser, myGuides, likedGuides, savedGuides]);

  return (
    <Card
      bordered
      className='w-4/5'
      title={currentFilter}
    >
    <Radio.Group value={currentFilter} onChange={(e) => setCurrentFilter(e.target.value)} style={{marginBottom: "10px"}}>
      <Radio.Button value={t("components.table_profile.guides")}>{t("components.table_profile.guides")}</Radio.Button>
      <Radio.Button value={t("components.table_profile.liked")}>{t("components.table_profile.liked")}</Radio.Button>
      <Radio.Button value={t("components.table_profile.saved")}>{t("components.table_profile.saved")}</Radio.Button>
    </Radio.Group>
    <MyTable data={currentFilter === t("components.table_profile.guides") ? myGuides : currentFilter === t("components.table_profile.liked") ? likedGuides : savedGuides} className='w-full'/>
    </Card>
  );
};

export default CardTableProfile;
