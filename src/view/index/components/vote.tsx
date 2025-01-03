import { Button, Ellipsis, Grid, Image } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/card'
import { useAppSelector } from '@/store'
import { ItokenData } from '@/store/interface'
import { basePair } from '@/util/baseData'

interface VoteProps {
  data?: ItokenData | null
  uPstatus?: boolean
  onChange?: (item: number) => void
  className?: string
}

export default function Vote({
  data = basePair,
  onChange,
  className,
  ...props
}: VoteProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { tokens } = useAppSelector(state => state.list)

  return (
    <Grid.Item className={className}>
      <Card animation={false}>
        <div className="grid grid-flow-col grid-cols-[3fr] !items-center !justify-between gap-3">
          {/* 代币信息 */}
          <Grid.Item
            onClick={() => {
              if (!data?.pair) return
              navigate(`/list/details?id=${data?.address || ''}`, {
                state: { path: '/' },
              })
            }}
          >
            <div className="grid grid-flow-col !grid-cols-[40px,1fr] items-center gap-3">
              <Image
                src={data?.pair?.info?.imageUrl || data?.logo || ''}
                className="!w-[40px] !h-[40px] rounded-lg"
              />
              <Grid columns={1} gap={2} className="text-left">
                <Grid.Item className="text-sm font-bold flex gap-1">
                  <Ellipsis
                    direction="end"
                    content={data?.pair?.baseToken.name || data?.name || ''}
                    className="flex-1"
                  />
                </Grid.Item>
                <Grid.Item
                  className={`text-xs font-medium grid grid-flow-col !grid-cols-[repeat(10px,1fr)] items-center gap-1`}
                >
                  <Ellipsis
                    direction="end"
                    content={data?.pair?.baseToken.symbol || data?.symbol || ''}
                  />
                </Grid.Item>
              </Grid>
            </div>
          </Grid.Item>

          {/*  代币价格 */}
          <Grid.Item
            onClick={() => {
              if (!data?.pair) return
              navigate(`/list/details?id=${data?.address || ''}`, {
                state: { path: '/' },
              })
            }}
          >
            <Grid columns={1} gap={2} className="text-end justify-items-end">
              <Grid.Item className="text-sm font-bold">
                {data?.pair ? <>{data?.pair?.priceUsd || 0} $</> : <>---</>}
              </Grid.Item>
              <Grid.Item
                className={`text-xs w-fit font-medium text-[--success-color] grid grid-flow-col !grid-cols-[repeat(10px,1fr)] items-center gap-1`}
              >
                {data?.pair ? (
                  <>
                    {' '}
                    {t('vote.votes')} {data?.votes || 0}
                  </>
                ) : (
                  <>---</>
                )}
              </Grid.Item>
            </Grid>
          </Grid.Item>

          {/* 投票按钮 */}
          <Grid.Item className="flex justify-end">
            <Button
              size="mini"
              onClick={() => onChange && onChange(1)}
              disabled={!data?.pair}
              color="default"
              className="!font-medium !border-[2px] !bg-[#313549] !border-[#313549] relative overflow-hidden min-w-[70px]"
            >
              <div
                className="absolute z-0 top-0 left-0 h-full bg-[--primary]"
                style={{
                  width: `${((data?.votes || 0) / tokens.data.votes) * 100}%`,
                }}
              ></div>
              <span className="opacity-0">{t('public.vote')}</span>
              <span className="absolute z-0 top-0 left-0 flex w-full h-full justify-center items-center">
                {data?.pair ? t('public.vote') : 'no pair'}
              </span>
            </Button>
          </Grid.Item>
        </div>
      </Card>
    </Grid.Item>
  )
}
