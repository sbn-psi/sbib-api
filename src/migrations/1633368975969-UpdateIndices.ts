import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateIndices1633368975969 implements MigrationInterface {
    name = 'UpdateIndices1633368975969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `images` CHANGE `is_done` `is_done` tinyint NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_bdcb7aae930d75a34f0ca23df6` ON `images` (`image_name`)");
        await queryRunner.query("CREATE INDEX `IDX_f97ca3dd2d80d0ea40eead48dc` ON `footprints` (`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_f97ca3dd2d80d0ea40eead48dc` ON `footprints`");
        await queryRunner.query("DROP INDEX `IDX_bdcb7aae930d75a34f0ca23df6` ON `images`");
        await queryRunner.query("ALTER TABLE `images` CHANGE `is_done` `is_done` tinyint NOT NULL DEFAULT '0'");
    }

}
