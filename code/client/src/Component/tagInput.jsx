import React, { useState, useEffect } from 'react';
import { Input, Tag } from 'antd';

const TagInput = ({ onTagsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = (value) => {
    if (value && !tags.includes(value)) {
      const newTags = [...tags, value];
      setTags(newTags);
      onTagsChange(newTags);
    }
    setInputValue('');
  };

  const removeTag = (tag) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    onTagsChange(newTags);
  };

  useEffect(() => {
    onTagsChange(tags);
  }, []);

  return (
    <div>
      <Input
        placeholder="Add a tag"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={(e) => {
          addTag(e.target.value);
          setInputValue('');
        }}
      />
      <div className="pt-2 space-y-1">
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          color = tag.length > 7 ? 'volcano' : color;
          color = tag.length > 9 ? 'orange' : color;
          color = tag.length > 11 ? 'red' : color;
          color = tag.length > 13 ? 'magenta' : color;

          return (
            <Tag
              color={color}
              key={tag}
              closable
              onClose={() => removeTag(tag)}
            >
              {tag}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default TagInput;
