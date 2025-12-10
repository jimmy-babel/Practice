import React, { useState } from 'react'
import OriPop from "@/components/ori-cmpts/ori-pop/OriPop"
type Props = {}

const MoodRecord = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    console.log('onCloseonClose', visible);
    setVisible(false);
  };
  return (
    <>
      <div onClick={() => setVisible(true)}>MoodRecord</div>
      <OriPop
        visible={visible}
        onVisibleChange={setVisible}
        onClose={onClose}
        placement="center"
        children={
          <>
            <div className='flex justify-center items-center'>
              <div className='text-2xl font-bold'>Mood Record Pop</div>
            </div>
          </>
        }
        // offset={10}
        // customPopupStyle={{
        //   width: '300px',
        //   height: '200px',
        //   backgroundColor: 'rgba(255, 255, 255, 0.9)',
        //   borderRadius: '10px',
        //   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        // }}
        ></OriPop>
    </>
  )
}
export default MoodRecord;