import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useToggleValue from '../../hooks/useToggleValue';
import { colors } from '../../styles/theme';
import Toggle from '../common/Toggle';
import { Category, Container, ChartToggle } from './Style';

interface CATEGORY {
  name: string;
  color: string;
}
type GRAPH = typeof Line | typeof Bar;

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        padding: 20,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        padding: 10,
      },
    },
  },
};

const CategoryInfo = [
  {
    name: '최근 푼 시험',
    color: colors.gray1,
  },
  {
    name: '또다른 무언가',
    color: colors.gray2,
  },
  {
    name: '무언가 무언가',
    color: colors.gray3,
  },
];

const Chart = () => {
  const [Graph, toggle, setToggle] = useToggleValue<GRAPH>(false, { falseValue: Line, trueValue: Bar });
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const category = CategoryInfo[categoryIndex];

  const labels = ['11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16'];
  const data = {
    labels,
    borderColor: '#ffff',
    datasets: [
      {
        label: '자료구조',
        data: [5, 2, 1, 3, 0, 0, 1],
        backgroundColor: '#ff7f50',
        borderColor: '#ff7f50',
      },
      {
        label: '데이터베이스',
        data: [2, 1, 1, 4, 6, 3, 1],
        backgroundColor: '#ff6b81',
        borderColor: '#ff6b81',
      },
      {
        label: '자바',
        data: [1, 2, 1, 1, 4, 5, 1],
        backgroundColor: '#7bed9f',
        borderColor: '#7bed9f',
      },
      {
        label: '임시 시험',
        data: [2, 2, 1, 3, 0, 3, 4],
        backgroundColor: '#70a1ff',
        borderColor: '#70a1ff',
      },
    ],
  };

  return (
    <Container bgColor={category.color}>
      {CategoryInfo.map(({ name }, idx) => {
        return (
          <Category key={name} onClick={() => setCategoryIndex(idx)}>
            {name}
          </Category>
        );
      })}

      <ChartToggle>
        <Toggle setToggle={setToggle} />
      </ChartToggle>

      <Graph options={options} data={data} />
    </Container>
  );
};

export default Chart;
