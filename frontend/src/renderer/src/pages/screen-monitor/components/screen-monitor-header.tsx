import React from 'react'
import { Button, Space, Typography, Popover } from '@arco-design/web-react'
import { IconPlayArrow, IconSettings, IconRecordStop } from '@arco-design/web-react/icon'

const { Title, Text } = Typography

interface ScreenMonitorHeaderProps {
  hasPermission: boolean
  isMonitoring: boolean
  isToday: boolean
  screenAllSources: any[]
  appAllSources: any[]
  onOpenSettings: () => void
  onStartMonitoring: () => void
  onStopMonitoring: () => void
  onRequestPermission: () => void
}

const ScreenMonitorHeader: React.FC<ScreenMonitorHeaderProps> = ({
  hasPermission,
  isMonitoring,
  isToday,
  screenAllSources,
  appAllSources,
  onOpenSettings,
  onStartMonitoring,
  onStopMonitoring
}) => {
  return (
    <div className="flex justify-between items-start mb-3 flex-col md:flex-row">
      <div className="w-full md:w-4/5">
        <Title
          heading={3}
          className="[&_.arco-typography]: !mt-1 [&_.arco-typography]: !font-bold [&_.arco-typography]: !text-[24px] [&_.arco-typography]: !text-black">
          屏幕监控
        </Title>
        <Text type="secondary" className="[&_.arco-typography]: !text-[13px]">
          屏幕监控会定期截取你的屏幕内容，并将其转化为智能、互相关联的上下文。所有数据都仅保存在本地，完整保护你的隐私 ✨
        </Text>
      </div>
      <div className="flex items-center ml-0 md:ml-6 mt-4 md:mt-0 justify-end">
        {hasPermission ? (
          <Space>
            <Popover content="仅在停止录制后才能调整设置" disabled={!isMonitoring}>
              <Button
                type="outline"
                icon={<IconSettings />}
                size="large"
                disabled={isMonitoring}
                onClick={onOpenSettings}
                className="[&_.arco-btn]: !bg-white [&_.arco-btn]: !border-gray-300 [&_.arco-btn]: !text-black [&_.arco-btn:hover]: !bg-gray-50">
                设置
              </Button>
            </Popover>
            {!isMonitoring ? (
              <Popover
                content="请先点击“设置”，选择需要监控的窗口或屏幕"
                disabled={!(screenAllSources.length === 0 && appAllSources.length === 0)}>
                <Button
                  type="primary"
                  icon={<IconPlayArrow />}
                  size="large"
                  onClick={onStartMonitoring}
                  disabled={isMonitoring || !isToday}
                  style={{
                    background: '#000'
                  }}>
                  开始录制
                </Button>
              </Popover>
            ) : (
              <Button
                type="primary"
                status="danger"
                icon={<IconRecordStop />}
                size="large"
                onClick={onStopMonitoring}
                className="[&_.arco-btn-primary]: !bg-red-500 [&_.arco-btn-primary:hover]: !bg-red-600">
                停止录制
              </Button>
            )}
          </Space>
        ) : null}
      </div>
    </div>
  )
}

export default ScreenMonitorHeader
