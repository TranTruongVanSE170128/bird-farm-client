import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { useTheme } from '../theme-provider'

interface CircleChartProps {
  items: {
    values: number[]
    labels: string[]
  }
  title: string
}

ChartJS.register(...registerables)

const CircleChart = ({ items, title }: CircleChartProps) => {
  const { theme } = useTheme()
  const labelColor = theme === 'dark' ? '#F2F2F2' : '#09090B'

  const chartData = {
    labels: items.labels,
    datasets: [
      {
        data: items.values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#33FF99',
          '#CC66FF',
          '#FF8C1A',
          '#1A8CFF',
          '#FF1A8C',
          '#FF99CC',
          '#99CCFF',
          '#FFFF99',
          '#99FF99',
          '#9966CC',
          '#FF9933',
          '#3399FF'
        ]
      }
    ]
  }

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: labelColor
        }
      },
      title: {
        display: true,
        text: title,
        color: labelColor,
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  }

  return <Doughnut data={chartData} options={chartOptions} />
}

export default CircleChart
