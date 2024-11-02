import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, Card, Radio } from 'antd';
import MyTable from './table';

const CardTableProfile = ({ Guides, currentUser }) => {
  const [currentFilter, setCurrentFilter] = useState('My Guides');
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
    <Radio.Group value={currentFilter} onChange={(e) => setCurrentFilter(e.target.value)}>
      <Radio.Button value='My Guides'>My Guides</Radio.Button>
      <Radio.Button value='Liked Guides'>Liked Guides</Radio.Button>
      <Radio.Button value='Saved Guides'>Saved Guides</Radio.Button>
    </Radio.Group>
    <MyTable data={currentFilter === 'My Guides' ? myGuides : currentFilter === 'Liked Guides' ? likedGuides : savedGuides} className='w-full'/>
    </Card>
  );
};

export default CardTableProfile;
