import { useCallback, useState } from 'react';
import styled from 'styled-components';
import SEARCH_TYPE from '../../../pages/search/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import selectSearchType from '../../../redux/search/searchType/selector';
import { updateSearchType } from '../../../redux/search/searchType/slice';
import { colors } from '../../../styles/theme';

export const RadioContainer = styled.fieldset`
  border: 1px solid ${colors.gray3};
  border-radius: 8px;
  padding: 4px 6px;

  color: ${colors.gray4};
  font-size: 14px;

  display: flex;
  align-items: center;
`;

const SelectSearchType = () => {
  const dispatch = useAppDispatch();
  const { searchType } = useAppSelector(selectSearchType);
  const [searchOption, setSearchOption] = useState<string>(searchType);

  const handleSearchOption = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
    dispatch(updateSearchType({ searchType: e.target.value }));
  }, []);

  return (
    <RadioContainer>
      <label htmlFor={SEARCH_TYPE.title}>
        <input
          type="radio"
          id={SEARCH_TYPE.title}
          name="searchOption"
          value={SEARCH_TYPE.title}
          onChange={handleSearchOption}
          defaultChecked={searchOption === SEARCH_TYPE.title}
        />
        제목
      </label>

      <label htmlFor={SEARCH_TYPE.content}>
        <input
          type="radio"
          id={SEARCH_TYPE.content}
          name="searchOption"
          value={SEARCH_TYPE.content}
          onChange={handleSearchOption}
          defaultChecked={searchOption === SEARCH_TYPE.content}
        />
        내용
      </label>

      <label htmlFor={SEARCH_TYPE.title_content}>
        <input
          type="radio"
          id={SEARCH_TYPE.title_content}
          name="searchOption"
          value={SEARCH_TYPE.title_content}
          onChange={handleSearchOption}
          defaultChecked={searchOption === SEARCH_TYPE.title_content}
        />
        제목+내용
      </label>
    </RadioContainer>
  );
};

export default SelectSearchType;
