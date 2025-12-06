import React from 'react'
import { Typography } from '@arco-design/web-react'
import { SCREEN_INTERVAL_TIME } from '../constant'

const { Text } = Typography

interface RecordingStatusIndicatorProps {
  isMonitoring: boolean
  canRecord: boolean
  isToday: boolean
}

const RecordingStatusIndicator: React.FC<RecordingStatusIndicatorProps> = ({ isMonitoring, canRecord, isToday }) => {
  if (!isToday) return null

  return (
    <>
      {isMonitoring ? (
        canRecord ? (
          <div className="w-full text-sm">
            <Text className="[&_.arco-typography]: !font-bold [&_.arco-typography]: !text-[#5252FF] [&_.arco-typography]: !text-xs">
              正在录制屏幕…
            </Text>
            <div className="text-[#C9C9D4]">
              MineContext 将每隔 {SCREEN_INTERVAL_TIME} 分钟根据屏幕内容生成一条活动记录。
            </div>
          </div>
        ) : (
          <div className="w-full text-sm">
            <Text className="[&_.arco-typography]: !font-bold [&_.arco-typography]: !text-[#FF4D4F] [&_.arco-typography]: !text-xs">
              录制已暂停
            </Text>
            <div className="text-[#C9C9D4]">
              当前不在录制时间段内，系统将在下一个允许的时间点自动开始录制。
            </div>
          </div>
        )
      ) : (
        <div style={{ width: '100%', fontSize: 14 }}>
          <Text style={{ fontWeight: 'bold', color: '#FF4D4F', fontSize: 12 }}>录制已停止</Text>
          <div style={{ color: '#C9C9D4' }}>你可以随时再次开始录制</div>
        </div>
      )}
    </>
  )
}

export default RecordingStatusIndicator
