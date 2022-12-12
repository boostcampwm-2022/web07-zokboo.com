const myTestData = [
  {
    testId: 0,
    title: '시험 제목',
    totalCount: 10,
    minutes: 60,
    seconds: 0,
    workbooks: [
      {
        workbook: {
          workbookId: 0,
          title: '문제집 제목1111111111',
          description: '문제집 설명1111',
          questionCount: 5,
        },
        count: 1,
      },
      {
        workbook: {
          workbookId: 1,
          title: '문제집 제목22222222',
          description: '문제집 설명2222222',
          questionCount: 5,
        },
        count: 2,
      },
    ],
  },
  {
    testId: 1,
    title: '또다른 시험 제목',
    totalCount: 20,
    minutes: 30,
    seconds: 0,
    workbooks: [
      {
        workbook: {
          workbookId: 0,
          title: '또다른 문제집 제목1111111111',
          description: '또다른 문제집 설명1111',
          questionCount: 10,
        },
        count: 1,
      },
      {
        workbook: {
          workbookId: 1,
          title: '또다른 문제집 제목22222222',
          description: '또다른 문제집 설명2222222',
          questionCount: 10,
        },
        count: 2,
      },
    ],
  },
];

export default myTestData;
