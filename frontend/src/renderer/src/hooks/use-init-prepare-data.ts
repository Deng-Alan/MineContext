// Copyright (c) 2025 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: Apache-2.0

import { TODOActivity } from '@interface/db/todo'
import { TaskUrgency } from '@renderer/constant/feed'
import { useMount, useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
const TODOList = [
  {
    id: -3, // Auto-incrementing ID (simulated value)
    content:
      '点击【创作】侧边栏中的【快速上手教程】文档，快速了解 MineContext 的功能与使用方式。',
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    urgency: TaskUrgency.High, // 1=Urgent
    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DD 23:59:59'),
    assignee: 'system'
  },
  {
    id: -2,
    content:
      '进入【屏幕监控】页面的【设置】，配置你的屏幕录制区域，然后点击【开始录制】。',
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    urgency: TaskUrgency.High, // 0=Normal
    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DD 23:59:59'),
    assignee: 'system'
  },
  {
    id: -4,
    content: '点击右上角的【与 AI 对话】，体验 AI 伙伴问答与创作能力。',
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Due before the end of work today
    urgency: TaskUrgency.High, // 2=Very Urgent
    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DD 23:59:59'),
    assignee: 'system'
  }
]
const useInitPrepareData = () => {
  const [todoList, setTodoList] = useState<TODOActivity[]>([])
  const { run, loading, data } = useRequest<TODOActivity[], any>(
    async () => {
      // await window.screenMonitorAPI.clearSettings('todoList-finished')

      const isFinished = await window.screenMonitorAPI.getSettings<boolean>('todoList-finished')
      if (isFinished) {
        return []
      }
      // await window.screenMonitorAPI.clearSettings('todoList')

      const res = await window.screenMonitorAPI.getSettings<TODOActivity[]>('todoList')
      if (!res || !Array.isArray(res)) {
        await window.screenMonitorAPI.setSettings('todoList', TODOList)
        return TODOList as TODOActivity[]
      }
      return res
    },
    { manual: true }
  )
  const { run: deleteTodoList, data: resetData } = useRequest(
    async (id: number) => {
      const res = await window.screenMonitorAPI.getSettings<TODOActivity[]>('todoList')
      if (res && Array.isArray(res)) {
        const filteredList = res.filter((item) => item.id !== id)
        await window.screenMonitorAPI.setSettings('todoList', filteredList)
        if (filteredList.length <= 0) {
          await window.screenMonitorAPI.setSettings('todoList-finished', true)
        }
        return filteredList
      }
      return []
    },
    { manual: true }
  )
  const { run: editTodoList } = useRequest(
    async (activity: TODOActivity) => {
      const res = await window.screenMonitorAPI.getSettings<TODOActivity[]>('todoList')
      if (res && Array.isArray(res)) {
        const updatedList = res.map((item) => (item.id === activity.id ? activity : item))
        await window.screenMonitorAPI.setSettings('todoList', updatedList)
        return updatedList
      }
      return []
    },
    { manual: true }
  )
  useMount(() => {
    run()
  })

  useEffect(() => {
    if (data) {
      setTodoList(data)
    }
  }, [data])
  useEffect(() => {
    if (resetData) {
      setTodoList(resetData)
    }
  }, [resetData])

  return { loading, data: todoList, deleteTodoList, editTodoList }
}
export { useInitPrepareData }
