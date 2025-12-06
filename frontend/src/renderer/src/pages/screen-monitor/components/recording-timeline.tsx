import React from 'react'
import { Typography, Timeline } from '@arco-design/web-react'
import { Activity } from '../screen-monitor'
import { ActivityTimelineItem } from './activitie-timeline-item'
import { formatTime } from '@renderer/utils/time'
import { SCREEN_INTERVAL_TIME } from '../constant'
import RecordingStatsCard, { RecordingStats } from './recording-stats-card'
import dayjs from 'dayjs'

const { Text } = Typography
const TimelineItem = Timeline.Item

interface RecordingTimelineProps {
  isMonitoring: boolean
  isToday: boolean
  canRecord: boolean
  activities: Activity[]
  recordingStats: RecordingStats | null
}

const RecordingTimeline: React.FC<RecordingTimelineProps> = ({
  isMonitoring,
  isToday,
  canRecord,
  activities,
  recordingStats
}) => {
  console.log('[RecordingTimeline] Props:', {
    isMonitoring,
    isToday,
    canRecord,
    hasRecordingStats: !!recordingStats,
    recordingStats
  })

  return (
    <div className="mt-5">
      <Timeline labelPosition="relative">
        {isToday && (
          <TimelineItem label="现在" className="!pb-[24px]">
            {isMonitoring ? (
              canRecord ? (
                <>
                  <div className="w-full text-sm">
                    <Text className="[&_.arco-typography]: !font-bold [&_.arco-typography]: !text-[#5252FF] [&_.arco-typography]: !text-xs">
                      正在录制屏幕…
                    </Text>
                    <div className="text-[#C9C9D4]">
                      MineContext 将每隔 {SCREEN_INTERVAL_TIME} 分钟根据屏幕内容生成一条活动记录。
                    </div>
                  </div>
                  <RecordingStatsCard stats={recordingStats} />
                </>
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
          </TimelineItem>
        )}

        {/* Display activities */}
        {activities
          .sort((a, b) => dayjs(b.start_time).valueOf() - dayjs(a.start_time).valueOf()) // Sort by time in descending order
          .map((activity) => (
            <TimelineItem label={formatTime(activity?.end_time)} key={activity.id}>
              <ActivityTimelineItem key={activity.id} activity={activity} />
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  )
}

export default RecordingTimeline
