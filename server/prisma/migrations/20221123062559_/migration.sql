-- CreateTable
CREATE TABLE `BasicUser` (
    `user_id` BIGINT NOT NULL,
    `password` CHAR(60) NOT NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,
    `email` VARCHAR(254) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hashtag` (
    `hashtag_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`hashtag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OauthUser` (
    `user_id` BIGINT NOT NULL,
    `oauth_id` VARCHAR(50) NOT NULL,
    `oauth_type` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `oauth_type`(`oauth_type`, `oauth_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `option_id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(300) NOT NULL,
    `question_id` BIGINT NOT NULL,

    INDEX `FK_Question_TO_Option_1`(`question_id`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `question_id` BIGINT NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(1000) NOT NULL,
    `question_type` VARCHAR(10) NOT NULL,
    `user_id` BIGINT NOT NULL,
    `answer` VARCHAR(1000) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `commentary` VARCHAR(1000) NOT NULL,
    `difficulty` DOUBLE NOT NULL,

    INDEX `FK_User_TO_Question_1`(`user_id`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionHashtag` (
    `question_hashtag_id` BIGINT NOT NULL AUTO_INCREMENT,
    `question_id` BIGINT NOT NULL,
    `hashtag_id` BIGINT NOT NULL,

    UNIQUE INDEX `question_id`(`question_id`, `hashtag_id`),
    UNIQUE INDEX `question_id_2`(`question_id`, `hashtag_id`),
    UNIQUE INDEX `hashtag_id`(`hashtag_id`, `question_id`),
    PRIMARY KEY (`question_hashtag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionImage` (
    `question_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(2083) NOT NULL,
    `question_id` BIGINT NOT NULL,

    INDEX `FK_Question_TO_QuestionImage_1`(`question_id`),
    PRIMARY KEY (`question_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionLike` (
    `user_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,

    INDEX `FK_Question_TO_QuestionLike_1`(`question_id`),
    PRIMARY KEY (`user_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Test` (
    `test_id` BIGINT NOT NULL AUTO_INCREMENT,
    `total_count` INTEGER NOT NULL,
    `user_id` BIGINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `timeout` INTEGER NOT NULL,

    INDEX `FK_User_TO_Test_1`(`user_id`),
    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestPaper` (
    `test_paper_id` BIGINT NOT NULL AUTO_INCREMENT,
    `test_id` BIGINT NOT NULL,
    `correct_count` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `FK_Test_TO_TestPaper_1`(`test_id`),
    PRIMARY KEY (`test_paper_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestPaperQuestion` (
    `test_paper_question_id` BIGINT NOT NULL AUTO_INCREMENT,
    `test_paper_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `written_answer` VARCHAR(1000) NOT NULL,
    `is_correct` BOOLEAN NULL,
    `review` VARCHAR(1000) NULL,

    INDEX `FK_Question_TO_TestPaperQuestion_1`(`question_id`),
    UNIQUE INDEX `test_paper_id`(`test_paper_id`, `question_id`),
    UNIQUE INDEX `test_paper_id_2`(`test_paper_id`, `question_id`),
    PRIMARY KEY (`test_paper_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `nickname` VARCHAR(64) NOT NULL,
    `avatar` VARCHAR(2083) NOT NULL,

    UNIQUE INDEX `nickname`(`nickname`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workbook` (
    `workbook_id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(62) NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT false,
    `user_id` BIGINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `creator_id` BIGINT NOT NULL,
    `description` VARCHAR(1000) NULL,

    INDEX `FK_User_TO_Workbook_1`(`user_id`),
    INDEX `FK_User_TO_Workbook_2`(`creator_id`),
    PRIMARY KEY (`workbook_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkbookLike` (
    `user_id` BIGINT NOT NULL,
    `workbook_id` BIGINT NOT NULL,

    INDEX `FK_Workbook_TO_WorkbookLike_1`(`workbook_id`),
    PRIMARY KEY (`user_id`, `workbook_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkbookQuestion` (
    `workbook_question_id` BIGINT NOT NULL AUTO_INCREMENT,
    `workbook_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `written_answer` VARCHAR(1000) NOT NULL,

    INDEX `FK_Question_TO_WorkbookQuestion_1`(`question_id`),
    UNIQUE INDEX `workbook_id`(`workbook_id`, `question_id`),
    UNIQUE INDEX `workbook_id_2`(`workbook_id`, `question_id`),
    PRIMARY KEY (`workbook_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkbookTest` (
    `workbook_test_id` BIGINT NOT NULL AUTO_INCREMENT,
    `workbook_id` BIGINT NOT NULL,
    `test_id` BIGINT NOT NULL,
    `count` INTEGER NOT NULL,

    INDEX `FK_Test_TO_WorkbookTest_1`(`test_id`),
    UNIQUE INDEX `workbook_id`(`workbook_id`, `test_id`),
    UNIQUE INDEX `workbook_id_2`(`workbook_id`, `test_id`),
    PRIMARY KEY (`workbook_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BasicUser` ADD CONSTRAINT `FK_User_TO_BasicUser_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OauthUser` ADD CONSTRAINT `FK_User_TO_OauthUser_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `FK_Question_TO_Option_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `FK_User_TO_Question_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestionHashtag` ADD CONSTRAINT `FK_Hashtag_TO_QuestionHashtag_1` FOREIGN KEY (`hashtag_id`) REFERENCES `Hashtag`(`hashtag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestionHashtag` ADD CONSTRAINT `FK_Question_TO_QuestionHashtag_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestionImage` ADD CONSTRAINT `FK_Question_TO_QuestionImage_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD CONSTRAINT `FK_Question_TO_QuestionLike_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD CONSTRAINT `FK_User_TO_QuestionLike_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `FK_User_TO_Test_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TestPaper` ADD CONSTRAINT `FK_Test_TO_TestPaper_1` FOREIGN KEY (`test_id`) REFERENCES `Test`(`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TestPaperQuestion` ADD CONSTRAINT `FK_Question_TO_TestPaperQuestion_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TestPaperQuestion` ADD CONSTRAINT `FK_TestPaper_TO_TestPaperQuestion_1` FOREIGN KEY (`test_paper_id`) REFERENCES `TestPaper`(`test_paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Workbook` ADD CONSTRAINT `FK_User_TO_Workbook_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Workbook` ADD CONSTRAINT `FK_User_TO_Workbook_2` FOREIGN KEY (`creator_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookLike` ADD CONSTRAINT `FK_User_TO_WorkbookLike_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookLike` ADD CONSTRAINT `FK_Workbook_TO_WorkbookLike_1` FOREIGN KEY (`workbook_id`) REFERENCES `Workbook`(`workbook_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookQuestion` ADD CONSTRAINT `FK_Question_TO_WorkbookQuestion_1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookQuestion` ADD CONSTRAINT `FK_Workbook_TO_WorkbookQuestion_1` FOREIGN KEY (`workbook_id`) REFERENCES `Workbook`(`workbook_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookTest` ADD CONSTRAINT `FK_Test_TO_WorkbookTest_1` FOREIGN KEY (`test_id`) REFERENCES `Test`(`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkbookTest` ADD CONSTRAINT `FK_Workbook_TO_WorkbookTest_1` FOREIGN KEY (`workbook_id`) REFERENCES `Workbook`(`workbook_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
