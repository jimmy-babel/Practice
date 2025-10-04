"use client"

import { useEffect } from 'react';
export default function Page() {
    useEffect(()=> {
        console.log("测试 useEffect");
        // 清理函数（组件卸载时执行）
        return () => {
            console.log("测试 useEffect 清理");
        };
    }, [])
    return <div>JIMMY</div>
}