export interface PostCreateTestBody {
  title: string;
  minute: number;
  second: number;

  workbooks: {
    workbookId: number;
    count: number;
  }[];
}

export default PostCreateTestBody;
