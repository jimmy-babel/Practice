import React from 'react';
import Image from 'next/image';

type Props = {}

const Profile = (props: Props) => {
  const avatarUrl = "http://devimgtest.innourl.com/SAAS_IMAGE/images/INNOVATION/user/avatar/20251011/20251011174558588_1883131.jpeg"
  const userName = "J";
  const tips = "在坚持不下去的时候坚持下去.";
  return (
    <div className=''>
      <Image className='' src={avatarUrl} alt="USER" width={50} height={50} />
      <div>
        <div>{userName}</div>
        <div>{tips}</div>
      </div>
    </div>
  )
}
export default Profile