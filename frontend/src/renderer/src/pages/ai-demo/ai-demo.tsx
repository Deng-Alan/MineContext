// Copyright (c) 2025 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react'
import { Typography, Space, Tabs, Alert, Button } from '@arco-design/web-react'
import AISidebar from '@renderer/components/ai-sidebar/index'

const { Title } = Typography
const TabPane = Tabs.TabPane

const AIDemo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('demo')

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Main content area */}
      <div
        className={`flex-1 h-full p-6 overflow-y-auto relative transition-[width] duration-300 ease-in-out ${isSidebarOpen ? 'w-[calc(100%-400px)]' : ''}`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <Title heading={1} style={{ marginBottom: '16px', color: '#1d2129' }}>
              AI 助手演示页
            </Title>
          </div>

          <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <TabPane key="demo" title="功能演示">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Alert
                  type="info"
                  title="开始使用"
                  content="请先在设置页配置你的豆包 API Key，然后点击右侧的 AI 按钮即可开始对话！"
                  showIcon
                  style={{ marginBottom: '24px' }}
                />
              </Space>
            </TabPane>
          </Tabs>
        </div>

        {/* AI toggle button - positioned relative to the content area */}
        <Button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-[100] hover:-translate-y-1/2 hover:scale-110 transition-transform duration-200 ease-in-out"></Button>
      </div>

      {/* AI sidebar - squeeze layout */}
      <div className="w-[400px] h-screen bg-white border-l border-gray-200 flex flex-col flex-shrink-0 shadow-[-2px_0_8px_rgba(0,0,0,0.1)]">
        <AISidebar />
      </div>
    </div>
  )
}

export default AIDemo
