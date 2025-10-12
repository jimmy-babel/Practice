import React from 'react';
import Image from 'next/image';

type Props = {}

const Profile = (props: Props) => {
  const avatarUrl = "http://devimgtest.innourl.com/SAAS_IMAGE/images/INNOVATION/user/avatar/20251011/20251011174558588_1883131.jpeg"
  const userName = "JIMMY";
  const tips = "GANBADIE.";
  return (
    <div className='w-[30vw] flex flex-col justify-center items-center'>
      <Image className='rounded-[50%] ' src={avatarUrl} alt="USER" width={50} height={50} />
      <div className='flex flex-col justify-center items-center'>
        <div>{userName}</div>
        <div>{tips}</div>
      </div>
    </div>
  )
}
export default Profile