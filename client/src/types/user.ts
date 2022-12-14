export interface PatchUpdateUserProfile {
  msg: string;
  data: {
    avatar: string;
  };
}

export interface GetUserInfo {
  msg: string;
  data: {
    workbookCount: number;
    testCount: number;
    testPaperCount: number;
    reviewCount: number;
    reviews: {
      title: string;
      createdAt: Date;
    };
  };
}
