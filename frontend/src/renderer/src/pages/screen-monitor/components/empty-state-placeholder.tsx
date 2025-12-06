import React from 'react'
import { Typography, Button } from '@arco-design/web-react'
import Stopped from '@renderer/assets/images/screen-monitor/stopped.png'
import NeedPermission from '@renderer/assets/images/screen-monitor/need-permission.svg'
import screenMonitorEmpty from '@renderer/assets/images/screen-monitor/screen-monitor-empty.svg'
import { SCREEN_INTERVAL_TIME } from '../constant'

const { Text } = Typography

interface EmptyStatePlaceholderProps {
  hasPermission: boolean
  isToday: boolean
  onGrantPermission: () => void
}

const EmptyStatePlaceholder: React.FC<EmptyStatePlaceholderProps> = ({ hasPermission, isToday, onGrantPermission }) => {
  return (
    <div className="flex items-center justify-center flex-1 min-h-[300px]">
      <div className="text-center flex flex-col items-center justify-center">
        {hasPermission ? (
          isToday ? (
            <>
              <img src={Stopped} alt="屏幕录制" style={{ width: 66, height: 78 }} />
              <Text style={{ marginTop: 16, width: 270, color: '#6C7191', fontSize: 12 }}>
                点击开始录制后，系统会每隔 {SCREEN_INTERVAL_TIME} 分钟自动截图并生成工作记录总结
              </Text>
            </>
          ) : (
            <>
              <img src={screenMonitorEmpty} alt="屏幕录制" style={{ width: 66, height: 78 }} />
              <Text style={{ marginTop: 16, width: 270, color: '#6C7191', fontSize: 12 }}>当前日期暂无数据</Text>
            </>
          )
        ) : (
          <>
            <img src={NeedPermission} alt="需要授权" style={{ width: 286, height: 168, marginLeft: 67 }} />
            <Text style={{ marginTop: 16, width: 440, color: '#6C7191', fontSize: 12 }}>
              请先开启屏幕录制权限，系统会每隔 {SCREEN_INTERVAL_TIME} 分钟使用 AI 为你生成总结
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={onGrantPermission}
              className="[&_.arco-btn-primary]: !mt-6 [&_.arco-btn-primary]: !font-medium [&_.arco-btn-primary]: !bg-black">
              开启权限
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default EmptyStatePlaceholder
