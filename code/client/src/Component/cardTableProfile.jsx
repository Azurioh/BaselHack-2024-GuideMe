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
    const myGuidesTemp = [];
    const likedGuidesTemp = [];
    const savedGuidesTemp = [];

    // Populate temporary arrays
    Guides.forEach((guide) => {
      if (guide.creator.id === currentUser.id) myGuidesTemp.push(guide);
      if (guide.likedBy.includes(currentUser.id)) likedGuidesTemp.push(guide);
      if (guide.savedBy.includes(currentUser.id)) savedGuidesTemp.push(guide);
    });

    // Update state once with the complete arrays
    setMyGuides(myGuidesTemp);
    setLikedGuides(likedGuidesTemp);
    setSavedGuides(savedGuidesTemp);
  }, [Guides]);

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
