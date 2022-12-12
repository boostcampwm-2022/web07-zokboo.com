import styled from 'styled-components';
import { colors, media } from '../../../styles/theme';

const SearchResultItemContainer = styled.div`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  box-shadow: 2px 2px ${colors.gray1};
  padding: 16px 12px;
  margin: 20px 0px;
  .more-button {
    float: right;
  }
  ${media.mobileWidth} {
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${colors.gray3};
    box-shadow: none;
  }
`;

export default SearchResultItemContainer;
