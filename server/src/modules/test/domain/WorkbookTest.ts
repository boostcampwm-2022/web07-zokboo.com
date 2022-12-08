import Workbook from '../../workbook/domain/Workbook';
import { WorkbookTest as pWorkbookTest } from '@prisma/client';

class WorkbookTest {
  public workbookTestId: bigint | undefined;
  public testId: bigint | undefined;
  public workbook: Workbook;
  public count: number;

  constructor(workbookTestId: bigint | undefined, testId: bigint, workbook: Workbook, count: number) {
    this.workbookTestId = workbookTestId;
    this.testId = testId;
    this.workbook = workbook;
    this.count = count;
  }

  static of(workbookTest: pWorkbookTest, workbook: Workbook) {
    return new WorkbookTest(workbookTest.workbook_test_id, workbookTest.test_id, workbook, workbookTest.count);
  }

  static new(workbook: Workbook, count: number) {
    return new WorkbookTest(undefined, undefined, workbook, count);
  }

  setId(workbookTestId: bigint) {
    this.workbookTestId = workbookTestId;
  }

  setTestId(testId: bigint) {
    this.testId = testId;
  }
}

export default WorkbookTest;
