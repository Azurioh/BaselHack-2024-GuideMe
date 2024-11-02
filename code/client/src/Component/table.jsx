import React, { useState } from 'react';
import { Table, Space, Tag, Button } from 'antd';
import { PlusOutlined, HeartOutlined, HeartFilled, StarOutlined,
    StarFilled, } from '@ant-design/icons';

const { Column } = Table;

const MyTable = ({ data, addGuideButtonCallBack, rateButtonCallBack, ...props }) => {
  const [tableData, setTableData] = useState(data);

  const toggleLike = (key) => {
    const updatedData = tableData.map((item) =>
      item.key === key ? { ...item, liked: !item.liked } : item
    );
    setTableData(updatedData);
  };

  const uniqueTags = Array.from(
    new Set(data.flatMap((item) => item.tags))
  ).map((tag) => ({ text: tag, value: tag }));

  return (
    <Table
      dataSource={tableData}
      {...props}
      className='w-11/12 content-center overflow-x-auto'
      scroll={{ x: true }}
      pagination={{ pageSize: 5 }}
    >
      <Column title="Guide" dataIndex="title" key="title" />
      <Column title="Author" dataIndex="author" key="author" />
      <Column
        title="Rating"
        dataIndex="rating"
        key="rating"
        onFilter={(value, record) => record.rating === value}
        sorter={(a, b) => a.rating - b.rating}
        render={(rating) => {
            if (rating > 5) {
                return "Invalid rating";
            }
            const maxRating = 5;
            const yellowStars = Array(rating).fill("*").map((_, index) =>
              <StarFilled style={{ color: "#ffbf00" }} />);
            const blackStars = Array(maxRating - rating).fill("*").map((_, index) => <StarOutlined style={{ color: "#ffbf00" }} />);

            return (
              <span>
                  {yellowStars}
                  {blackStars}
              </span>
            );
          }
        }
        defaultSortOrder={'descend'}
      />
      <Column
        title="Tags"
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
          <div className="flex justify-end items-end">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={addGuideButtonCallBack}
            />
          </div>
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
  );
};

export default MyTable;
