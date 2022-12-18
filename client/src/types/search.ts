interface SearchWorkbookType {
  workbookId: number;
  title: string;
  description: string;
  questionCount: number;
  questions?: string[];
  type?: string;
}

export default SearchWorkbookType;
