import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';

const DefaultFilterData = {
  publish: {
    list: [
      { key: "all", name: "全部" },{key:"on",name:"已发布"} ,{key:"off",name:"未发布"}
    ],
  },
};
// filterType: String,
// isRowSetAllAuto: {
//   //是否"全部"作为第一行 //默认开启
//   type: Boolean,
//   default: true,
// },
// rowSetAllText: {
//   // "全部"的文案
//   type: String,
//   default: "全部",
// },
// isApiAuto: Boolean, //是否API获取数据
// apiName: String,
// apiParams: {
//   type: Object,
//   default: () => ({}),
// },
// idKey: {
//   type: String,
//   default: "key",
// },
// nameKey: {
//   type: String,
//   default: "name",
// },
type Props = {
  filterType?: string,
  isRowSetAllAuto?: boolean,
  rowSetAllText?: string,
  isApiAuto?: boolean,
  apiName?: string,
  apiParams?: any,
  // apiParams?: Record<string, any>,
  idKey?: string,
  nameKey?: string,
}
const App: React.FC<Props> = (props:Props) => {
  const { filterType, isRowSetAllAuto, rowSetAllText, isApiAuto, apiName, apiParams, idKey, nameKey } = props;
  const [items, setItems] = useState<{label:string,value:number}[]>([]);
  const [curVal, setCurVal] = useState<number[]>([0]);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const init = async () => {
    return await loadData().then((list) => {
      // return setItems(list);
    });
  };
  const loadData = async () => {
    // let { apiName, apiParams, apiHeader, rowSetAllText, idKey, nameKey } = this;
    // if (isApiAuto) {
    //   let apiCache = app.StorageH.get("FILTER_API_CACHE") || {};
    //   const { code, data } = await getFilterApi({ apiName, apiParams, apiHeader, apiCache });
    //   if (code == 1) {
    //     let list = data?.list || (data.length > 0 ? data : []);
    //     list = list.map((item) => ({ ...item, key: item[idKey], name: item[nameKey] })); //重新赋值key name
    //     isRowSetAllAuto && list.unshift({ key: "all", name: rowSetAllText }); //增加"全部"
    //     apiCache[apiName] = { code, data };
    //     app.StorageH.set("FILTER_API_CACHE", apiCache);
    //     return list;
    //   }
    // } else {
    //   let list = DefaultFilterData?.[filterType]?.list || []; //默认list
    //   return list;
    // }
  }
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