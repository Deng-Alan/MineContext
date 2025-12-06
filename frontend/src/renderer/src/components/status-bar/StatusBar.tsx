// Copyright (c) 2025 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react'
import { Input, Tag } from '@arco-design/web-react'
import { Vault } from '@renderer/types'
import dayjs from 'dayjs'

interface StatusBarProps {
  vaultData: Vault | null
  onSummaryChange: (summary: string) => void
  onTagsChange: (tags: string) => void
}

const StatusBar: React.FC<StatusBarProps> = ({ vaultData, onSummaryChange, onTagsChange }) => {
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [isEditingTags, setIsEditingTags] = useState(false)

  if (!vaultData) {
    return null
  }

  const renderRow = (label: string, value: React.ReactNode, className?: string): React.ReactElement => (
    <div className={`flex items-center !mb-[12px] !text-[14px] ${className || ''}`}>
      <span className="text-[#666] w-[140px]">{label}：</span>
      <div className="text-[#333] w-full">{value}</div>
    </div>
  )

  const tags =
    typeof vaultData.tags === 'string' && vaultData.tags.trim() ? vaultData.tags.split(',').map((t) => t.trim()) : []

  return (
    <div className="status-bar-container">
      {renderRow(
        '创建时间',
        vaultData.created_at ? dayjs(vaultData.created_at).format('YYYY年MM月DD日 HH:mm:ss') : '无'
      )}
      {renderRow('捕获方式', '创作')} 
      {renderRow('处理方式', '智能总结')}
      {renderRow('上下文类型', '知识上下文')}
      {renderRow(
        '摘要',
        isEditingSummary ? (
          <Input.TextArea
            defaultValue={vaultData.summary || ''}
            onChange={onSummaryChange}
            onBlur={() => setIsEditingSummary(false)}
            placeholder="请输入摘要"
            autoSize
            autoFocus
            className="w-full"
          />
        ) : (
          <div
            onClick={() => {
              setIsEditingSummary(true)
            }}
            className="min-h-[22px] cursor-text w-full">
            {vaultData.summary || <span className="text-[#aaa]">暂无摘要</span>}
          </div>
        )
      )}
      {renderRow(
        '标签',
        <div className="flex flex-wrap items-center min-h-[32px] gap-x-[4px] gap-y-[4px]">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Tag key={index} className="mr-[8px] mb-[4px]">
                {tag}
              </Tag>
            ))
          ) : (
            <div className="text-[#aaa] mr-[8px]">暂无标签</div>
          )}
          {isEditingTags ? (
            <Input
              defaultValue=""
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = e.currentTarget.value.trim()
                  if (value.includes(',')) {
                    return
                  }
                  if (value) {
                    const newTags = [...tags, value]
                    onTagsChange(newTags.join(', '))
                    setIsEditingTags(false)
                  }
                }
              }}
              onBlur={() => setIsEditingTags(false)}
              placeholder="输入新标签后按回车"
              autoFocus
              className="!w-[120px] mr-[8px] mb-[4px] !inline-block"
            />
          ) : (
            <Tag
              className="mb-[4px] cursor-pointer bg-[#f0f0f0] !border-[#d9d9d9] !border-dashed border"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditingTags(true)
              }}>
              + 新标签
            </Tag>
          )}
        </div>,
        'items-start'
      )}
    </div>
  )
}

export default StatusBar
