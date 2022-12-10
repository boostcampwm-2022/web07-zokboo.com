import { MdArrowDropDown } from 'react-icons/md';
import { SubTitle, TextArea } from '../../../../styles/common';
import DropDown from '../../../common/dropdown';
import { DropdownItem } from '../../../common/dropdown/Style';
import { DIFFICULTY } from '../constants';
import { DropDownContainer, DropDownIcon, DropDownSelector, DropDownTitle, Step, TitleBox } from '../Style';

interface EtcData {
  commentary: string;
  difficultValue: number;
}

type Props = EtcData & {
  updateFields: (fields: Partial<EtcData>) => void;
};

const QuestionEtcForm = ({ commentary, difficultValue, updateFields }: Props) => {
  return (
    <Step>
      <SubTitle>해설 작성</SubTitle>
      <TextArea
        id="commentary"
        rows={15}
        value={commentary}
        onChange={(e) => updateFields({ commentary: e.target.value })}
      />

      <TitleBox>
        <SubTitle>문제 난이도</SubTitle>
      </TitleBox>

      <DropDownContainer>
        <DropDown
          title={
            <DropDownSelector>
              <DropDownTitle>{DIFFICULTY[difficultValue]}</DropDownTitle>
              <DropDownIcon>
                <MdArrowDropDown size={30} />
              </DropDownIcon>
            </DropDownSelector>
          }
          direction="right"
        >
          {DIFFICULTY.map((data, idx) => (
            <DropdownItem key={data} onClick={() => updateFields({ difficultValue: idx })}>
              {data}
            </DropdownItem>
          ))}
        </DropDown>
      </DropDownContainer>
    </Step>
  );
};

export default QuestionEtcForm;
