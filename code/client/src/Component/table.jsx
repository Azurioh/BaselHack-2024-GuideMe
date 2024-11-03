import { useState, useEffect } from 'react';
import { Table, Space, Tag, Button } from 'antd';
import { PlusOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import GuideDetail from './GuideDetail';

const { Column } = Table;

const MyTable = ({ data, addGuideButtonCallBack, rateButtonCallBack, ...props }) => {
  const [tableData, setTableData] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const transformedData = data.map(item => ({
      ...item,
      key: item.id,
      author: `${item.creator.firstName} ${item.creator.lastName}`,
      likes: item.likedBy.length,
      liked: item.likedBy.find((user) => user.id === 1) ? true : false,
    }));
    setTableData(transformedData);
  }, [data])

  const toggleLike = (key) => {
    const updatedData = tableData.map((item) =>
      item.key === key ? { ...item, liked: !item.liked } : item
    );
    setTableData(updatedData);
  };

  const getUniqueTags = (data) => {
    if (!data || !Array.isArray(data)) return [];
    const allTags = data.reduce((tags, item) => {
      if (item.keywords && Array.isArray(item.keywords)) {
        return [...tags, ...item.keywords];
      }
      return tags;
    }, []);
    return [...new Set(allTags)].map(tag => ({
      text: tag,
      value: tag
    }));
  };

  function handleRowClick(record) {
    setSelectedGuide(record);
    setModalVisible(true);
  }

  const uniqueTags = getUniqueTags(data);

  return (
    <>
      <Table
        dataSource={tableData}
        {...props}
        className='w-11/12 content-center overflow-x-auto'
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      >
        <Column title="Guide" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column
          title="Likes"
          dataIndex="likes"
          key="likes"
          onFilter={(value, record) => record.liked === value}
          sorter={(a, b) => a.liked - b.liked}
          defaultSortOrder={'descend'}
        />
        <Column
          title="Tags"
          dataIndex="keywords"
          key="keywords"
          render={(tags = []) => (
            <>
              {tags.map((tag, index) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                color = tag.length > 7 ? 'volcano' : color;
                color = tag.length > 9 ? 'orange' : color;
                color = tag.length > 11 ? 'red' : color;
                color = tag.length > 13 ? 'magenta' : color;
                return (
                  <Tag color={color} key={`${tag}-${index}`}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
          filters={uniqueTags}
          onFilter={(value, record) => record.keywords.includes(value)}
          sortDirections={'descend'}
        />
        <Column
          title={() => (
            addGuideButtonCallBack ? (
              <div className="flex justify-end items-end">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={addGuideButtonCallBack}
                />
              </div>
            ) : null
          )}
          key="actions"
          render={(text, record) => (
            <div className="flex justify-end items-end">
              <Button
                type="primary"
                onClick={() => toggleLike(record.key)}
                icon={record.liked ? <HeartFilled /> : <HeartOutlined />}
              />
            </div>
          )}
          width={50}
        />
      </Table>
      <GuideDetail guide={selectedGuide} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default MyTable;
