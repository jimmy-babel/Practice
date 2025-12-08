"use client";
import React, { useState } from "react";
import { Card } from "antd";

type Props = {};

const UserInfo = (props: Props) => {
  const [bloggerInfo, setBloggerInfo] = useState<{
    user_name?: string;
    introduce1?: string;
    introduce2?: string;
    motto1?: string;
    motto2?: string;
  }>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("提交表单数据:", bloggerInfo);
  };
  return (
    <div className="user-info-box">
      <form onSubmit={handleSubmit} className="p-10">
        <div className="gap-y-8 flex flex-col">
          <Card
            className="w-full rounded-[12px] overflow-hidden shadow-gray-400"
            variant="borderless"
            hoverable
          >
            <div className="p-8">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  USER_NAME
                </label>
                <input
                  type="text"
                  id="title"
                  value={bloggerInfo.user_name || ""}
                  onChange={(e) =>
                    setBloggerInfo((item) => ({
                      ...item,
                      user_name: e.target.value || "",
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入名字"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2 mt-5"
                >
                  INTRODUCE1
                </label>
                <input
                  type="text"
                  id="title"
                  value={bloggerInfo.introduce1 || ""}
                  onChange={(e) =>
                    setBloggerInfo((item) => ({
                      ...item,
                      introduce1: e.target.value || "",
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入内容"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2 mt-5"
                >
                  INTRODUCE2
                </label>
                <input
                  type="text"
                  id="title"
                  value={bloggerInfo.introduce2 || ""}
                  onChange={(e) =>
                    setBloggerInfo((item) => ({
                      ...item,
                      introduce2: e.target.value || "",
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入介绍"
                />
              </div>
            </div>
          </Card>
          
          <Card
            className="w-full rounded-[12px] overflow-hidden shadow-gray-400"
            variant="borderless"
            hoverable
          >
            <div className="p-8">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  MOTTO1
                </label>
                <input
                  type="text"
                  id="title"
                  value={bloggerInfo.motto1 || ""}
                  onChange={(e) =>
                    setBloggerInfo((item) => ({
                      ...item,
                      motto1: e.target.value || "",
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入内容"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2 mt-5"
                >
                  MOTTO2
                </label>
                <input
                  type="text"
                  id="title"
                  value={bloggerInfo.motto2 || ""}
                  onChange={(e) =>
                    setBloggerInfo((item) => ({
                      ...item,
                      motto2: e.target.value || "",
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
export default UserInfo;
