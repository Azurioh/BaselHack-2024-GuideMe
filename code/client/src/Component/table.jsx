import { useState } from 'react';
import { Table, Space, Tag, Button } from 'antd';
import { PlusOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import GuideDetail from './GuideDetail';

const { Column } = Table;

const MyTable = ({ data, addGuideButtonCallBack, rateButtonCallBack, ...props }) => {
  const [tableData, setTableData] = useState(data);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const toggleLike = (key) => {
    const updatedData = tableData.map((item) =>
      item.key === key ? { ...item, liked: !item.liked } : item
    );
    setTableData(updatedData);
  };

  const uniqueTags = Array.from(
    new Set(data.flatMap((item) => item.tags))
  ).map((tag) => ({ text: tag, value: tag }));

  function handleRowClick(record) {
    console.log("clicked");
    setSelectedGuide(record);
    setModalVisible(true);
  }

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
        <Column title={t("components.table.title_guide")} dataIndex="title" key="title" />
        <Column title={t("components.table.title_author")} dataIndex="author" key="author" />
        <Column
          title={t("components.table.likes")}
          dataIndex="likes"
          key="likes"
          onFilter={(value, record) => record.likes === value}
          sorter={(a, b) => a.likes - b.likes}
          defaultSortOrder={'descend'}
        />
        <Column
          title={t("components.table.tags")}
          dataIndex="tags"
          key="tags"
          render={(tags) => (
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
          showSorterTooltip={'full-header'}
          filters={uniqueTags}
          onFilter={(value, record) => record.tags.includes(value)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(record.key);
                }}
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
