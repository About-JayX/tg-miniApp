import './index.scss'

import { Card as AntdMobileCard } from 'antd-mobile'
const isMemes = import.meta.env.MODE.split('-')[1] === 'memes'
export default function Card({
  animation = true,
  className = '',
  type = 'default',
  ...props
}: {
  children?: React.ReactNode
  animation?: boolean
  className?: string
  type?: 'default' | 'primary'
}) {
  return (
    <div
      className={`bg-transparent ${isMemes ? 'memes-card' : ''} ${className}`}
    >
      <AntdMobileCard
        className={`${
          isMemes
            ? `relative !bg-[--primary-card-body-color] !rounded-xl !p-[2px] border border-[--primary-border-color] card ${
                animation ? 'card-animation' : ''
              }`
            : type === 'primary'
            ? `!bg-gradient-to-b !from-[#00AB5E] !to-[#2C2A62]`
            : '!bg-[--primary-card-body-color]'
        } `}
      >
        <div
          className={`${
            isMemes
              ? 'bg-gradient-to-b from-[#161329] via-black to-[#1d1b4b] !px-3 !py-2 !rounded-[10px] '
              : ''
          }`}
        >
          {props.children}
        </div>
      </AntdMobileCard>
    </div>
  )
}
