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
import styled from 'styled-components';
import useArrayValue from '../../hooks/useArrayValue';
import useToggleValue from '../../hooks/useToggleValue';
import { colors } from '../../styles/theme';
import Toggle from '../common/Toggle';

const ChartContainer = styled.div<{ bgColor: string }>`
  position: relative;

  width: 100%;
  height: 400px;

  padding: 20px;
  margin: 25px 0 10px 0;

  box-sizing: border-box;

  background-color: ${(props) => props.bgColor};
  border-radius: 0 10px 10px 10px;
`;

const ChartToggle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 40px;
  height: 20px;
`;

const ChartCategory = styled.button`
  position: absolute;
  top: -25px;
  left: 0;

  width: 120px;
  height: 25px;

  border: none;
  border-radius: 10px 10px 0 0;
  background-color: ${colors.gray1};

  text-align: center;
  cursor: pointer;

  :nth-child(2) {
    left: 120px;
    background-color: ${colors.gray2};
  }
  :nth-child(3) {
    left: 240px;
    background-color: ${colors.gray3};
  }
`;

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
  const [Graph, setToggle] = useToggleValue<GRAPH>({
    falseValue: Line,
    trueValue: Bar,
    initialState: false,
  });
  const [category, handleChange] = useArrayValue<CATEGORY>(CategoryInfo);

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
    <ChartContainer bgColor={category.color}>
      {CategoryInfo.map(({ name }, idx) => {
        return (
          <ChartCategory key={name} onClick={() => handleChange(idx)}>
            {name}
          </ChartCategory>
        );
      })}

      <ChartToggle>
        <Toggle setToggle={setToggle} />
      </ChartToggle>

      <Graph options={options} data={data} />
    </ChartContainer>
  );
};

export default Chart;
