/**
 * 문제집 검색 시 받아오는 데이터의 type입니다.
 *
 * workbook_id: number;
 * title: string;
 * creator_id: string;
 * create_at: string;
 * description: string;
 */
interface SearchWorkbookType {
  workbook_id: number;
  title: string;
  creator_id: string;
  create_at: string;
  description: string;
}

export default SearchWorkbookType;
