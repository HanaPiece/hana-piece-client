import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

// Register components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, ChartDataLabels);

interface DataLabelsContext extends Context {
  chart: ChartJS;
  dataIndex: number;
}

const consumptionLabels = ['외식', '마트', '쇼핑'];
const consumptionData = [285040, 146330, 105070];

const data: ChartData<'doughnut', number[], string> = {
  labels: consumptionLabels,
  datasets: [
    {
      label: '총합',
      data: consumptionData,
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4,
    },
  ],
};

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  layout: {
    padding: 20, // 차트 주변의 패딩을 추가
  },
  plugins: {
    legend: {
      display: false, // 레이블을 비활성화
    },
    title: {
      display: false,
      text: '소비 통계',
    },
    datalabels: {
      color: '#008485',
      anchor: 'end',
      align: 'end',
      offset: -15,
      borderColor: '#008485',
      borderWidth: 1,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,10)',
      formatter: (_value: number, context: DataLabelsContext) => {
        return `${context.chart.data.labels?.[context.dataIndex]}`;
      },
      labels: {
        title: {
          font: {
            weight: 'bold',
          },
        },
      }
    },
  },
};

const ConsumptionChart = () => {
  return (
    <Doughnut data={data} options={options} />
  );
};

export default ConsumptionChart;