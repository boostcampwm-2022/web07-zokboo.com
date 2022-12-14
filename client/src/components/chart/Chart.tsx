import { useEffect, useRef, useState } from 'react';
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
import randomColor from 'randomcolor';
import useToggleValue from '../../hooks/useToggleValue';
import Toggle from '../common/Toggle';
import { Category, Container, ChartToggle } from './Style';
import { Review } from '../../types/user';
import { colors } from '../../styles/theme';

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
    name: '최근 푼 시험지',
    color: colors.gray1,
  },
];

interface Props {
  reviewList: Review[];
}

interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

const createLabel = () => {
  const current = new Date();
  const label = [];

  for (let i = 0; i < 7; i += 1) {
    const month = (current.getMonth() + 1).toString();
    const date = current.getDate().toString();

    label.push(`${month.padStart(2, '0')}-${date.padStart(2, '0')}`);
    current.setDate(current.getDate() - 1);
  }

  return label.reverse();
};

const getReviewListSet = (reviewList: Review[], labels: string[]) => {
  const rowData = new Map<string, number[]>();
  const datasets = [] as DataSet[];

  reviewList.forEach(({ test, createdAt }) => {
    const date = createdAt.slice(5, 10);
    const index = labels.indexOf(date);

    if (index !== -1)
      if (rowData.has(test.title)) {
        const data = rowData.get(test.title) as number[];
        data[index] += 1;
      } else {
        const data = new Array(7).fill(0);
        data[index] += 1;
        rowData.set(test.title, data);
      }
  });

  rowData.forEach((data, key) => {
    const color = randomColor();
    datasets.push({
      label: key,
      data,
      backgroundColor: color,
      borderColor: color,
    });
  });

  return datasets;
};

const Chart = ({ reviewList }: Props) => {
  const { value: Graph, onToggle: setToggle } = useToggleValue<GRAPH>(false, { falseValue: Line, trueValue: Bar });
  const [categoryIndex] = useState<number>(0);
  const labels = createLabel();
  const dataRef = useRef({
    labels,
    borderColor: '#ffff',
    datasets: getReviewListSet(reviewList, labels),
  });

  const category = CategoryInfo[categoryIndex];

  useEffect(() => {
    dataRef.current = {
      labels,
      borderColor: '#ffff',
      datasets: getReviewListSet(reviewList, labels),
    };
  }, [reviewList]);

  return (
    <Container bgColor={category.color}>
      {CategoryInfo.map(({ name }) => {
        return <Category key={name}>{name}</Category>;
      })}

      <ChartToggle>
        <Toggle setToggle={setToggle} />
      </ChartToggle>

      <Graph options={options} data={dataRef.current} />
    </Container>
  );
};

export default Chart;
