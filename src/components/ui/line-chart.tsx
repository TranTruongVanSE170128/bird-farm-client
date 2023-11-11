import { Line } from 'react-chartjs-2'
import { CategoryScale, LinearScale, PointElement, LineElement, Chart, Tooltip } from 'chart.js'
import Spinner from './spinner'

Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(Tooltip)

interface DayData {
  _id: string
  value: number
}

type Props = {
  days: number
  chartData: DayData[]
  loadingLineChart: boolean
}

export default function LineChart({ days, chartData, loadingLineChart }: Props) {
  function getRadius(): number {
    const minRadius = 5
    const maxRadius = 10

    const range = maxRadius - minRadius
    const normalizedDays = Math.max(1, Math.min(365, days)) / 365

    return maxRadius - normalizedDays * range
  }

  return (
    <div className=''>
      {!loadingLineChart ? (
        <div>
          <div className='text-xl font-semibold text-center'>Doanh thu ({days} ngày gần đây) VNĐ</div>
          <Line
            data={{
              labels: chartData?.map((day) => {
                const date = new Date(day?._id)
                return date.toLocaleDateString()
              }),
              datasets: [
                {
                  data: chartData?.map((day) => day?.value),
                  borderColor: '#16A34A',
                  label: 'Doanh thu'
                }
              ]
            }}
            options={{
              scales: {
                x: {
                  ticks: {
                    color: '#16A34A'
                  }
                },
                y: {
                  ticks: {
                    color: '#16A34A'
                  }
                }
              },
              elements: {
                point: {
                  radius: getRadius()
                }
              },
              plugins: {
                tooltip: {
                  bodyFont: { size: 16 },
                  callbacks: {
                    label: function (context) {
                      const label = `${Number(context.parsed.y).toLocaleString()}VNĐ`
                      return label
                    }
                  }
                }
              }
            }}
          />
        </div>
      ) : (
        <div className='w-full aspect-[2/1] flex justify-center items-center'>
          <Spinner />
        </div>
      )}
    </div>
  )
}
