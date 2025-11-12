import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';

const App: React.FC = () => {
  const [items, setItems] = useState([{label:'全部',value:0},{label:'技术',value:1},{label:'生活',value:2}]);
  const [name, setName] = useState('');
  const [curVal, setCurVal] = useState<number[]>([0]);
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if(!name)return
    setItems([...items, {label: name, value: items.length}]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onChange = (value: number[], option: any) => {
    // console.log(`onChange:`,value,option);
    if(value[value.length-1] == 0){
      value = [0];
    }else{
      value = value.filter(v=>v!==0);
    }
    setCurVal(value);
  }

  return (
    <Select
      className='w-full'
      placeholder="选择文章分组"
      onChange={onChange}
      value={curVal}
      mode="multiple"
      optionFilterProp="label"
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="新增分组"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" onClick={addItem}>
              Add+
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item.label, value: item.value }))}
    />
  );
};

export default App;