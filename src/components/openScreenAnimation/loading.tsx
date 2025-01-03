import './index.scss'

import { Grid } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { symbol } from '@/config'
import { useTelegram } from '@/providers/telegram'

import Icon from '../icon'

export default function OpenScreenAnimation({
  status,
  onChange,
  ...props
}: {
  status?: boolean
  onChange?: (e: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation()
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)
  const { webApp } = useTelegram()
  // 记录触摸开始的Y坐标
  const handleTouchStart = (e: any) => {
    setTouchStartY(e.targetTouches[0].clientY)
  }

  // 记录触摸结束的Y坐标
  const handleTouchEnd = (e: any) => {
    setTouchEndY(e.changedTouches[0].clientY)
    handleSwipe()
  }

  // 检查是否为从下往上的滑动，若是则导航到指定页面
  const handleSwipe = () => {
    onChange && onChange(true)
    const swipeDistance = touchStartY - touchEndY
    if (swipeDistance > 50) {
      onChange && onChange(true)
    }
  }
  useEffect(() => {
    console.log(webApp, 'webApp')
  }, [webApp])
  return (
    <div {...props}>
      <div className="fixed top-0 left-0 w-full h-full bg-[url('/image/openScreenAnimation/bg.jpg')] bg-bottom bg-cover bg-no-repeat">
        <div className="grid justify-items-center w-auto h-full p-4">
          {webApp?.initDataUnsafe.user &&
          webApp?.initDataUnsafe.user.username ? (
            <Grid
              columns={1}
              gap={29}
              className="justify-items-center text-center h-fit mt-[4em]"
            >
              <Grid.Item className={`${status ? 'opacity-100' : 'opacity-0'}`}>
                <div className="login">
                  <div className="ui-loader loader-blk">
                    <svg viewBox="22 22 44 44" className="multiColor-loader">
                      <circle
                        cx="44"
                        cy="44"
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                        className="loader-circle loader-circle-animation"
                      ></circle>
                    </svg>
                  </div>
                </div>
              </Grid.Item>
              <Grid.Item>
                <Grid columns={1} gap={2} className="text-center">
                  <Grid.Item className="text-5xl italic font-black bg-clip-text text-transparent bg-gradient-to-b from-[--primary-text-color] to-[--primary]">
                    ${symbol}
                  </Grid.Item>
                  <Grid.Item className="text-base font-normal opacity-80">
                    {t('openScreenAnimation.text')}
                    {/* Anti-vc, make society great again! */}
                  </Grid.Item>
                </Grid>
              </Grid.Item>
              <Grid.Item className="flex flex-wrap gap-4 items-center">
                <a href={t('openScreenAnimation.telegramUrl')} target="_blank">
                  <Icon
                    name="telegram"
                    className="!w-12 !h-12 p-2 bg-black/50  rounded-xl border border-[--primary-border-color]"
                  />
                </a>
                <a href={t('openScreenAnimation.twitterUrl')} target="_blank">
                  <Icon
                    name="twitter"
                    className="!w-12 !h-12 p-2 bg-black/80 rounded-xl border border-[--primary-border-color]"
                  />
                </a>
                <a
                  href={t('openScreenAnimation.officialWebsiteUrl')}
                  target="_blank"
                >
                  <Icon
                    name="officialWebsite"
                    className="!w-12 !h-12 p-2 bg-black/50 rounded-xl border border-[--primary-border-color]"
                  />
                </a>
              </Grid.Item>
            </Grid>
          ) : (
            <div className="text-base font-normal opacity-80 mt-12">
              {' '}
              {t('public.settingUserName')}
            </div>
          )}
        </div>
        {webApp?.initDataUnsafe.user && webApp?.initDataUnsafe.user.username
          ? !status && (
              <div
                className="openScreenAnimation absolute bottom-0 w-full pb-4 h-[50vh] flex justify-center"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => handleSwipe()}
              >
                <Grid
                  columns={1}
                  gap={29}
                  className="justify-items-center absolute bottom-8"
                >
                  <Grid.Item>
                    <div className="arrow">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </Grid.Item>
                  <Grid.Item className="animate-float">
                    {t('openScreenAnimation.hintText')}
                  </Grid.Item>
                </Grid>
              </div>
            )
          : ''}
      </div>
    </div>
  )
}
