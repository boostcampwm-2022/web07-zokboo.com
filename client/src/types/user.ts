export interface PatchUpdateUserProfile {
  msg: string;
  data: {
    avatar: string;
  };
}

export interface Review {
  test: {
    title: string;
  };
  createdAt: string;
}

export interface GetUserInfo {
  msg: string;
  data: {
    workbookCount: number;
    testCount: number;
    testPaperCount: number;
    reviewCount: number;
    reviews: Review[];
  };
}
