import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinFootprintsToImages1632170988970 implements MigrationInterface {
    name = 'JoinFootprintsToImages1632170988970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `footprints` DROP COLUMN `coordinates`");
        await queryRunner.query("ALTER TABLE `footprints` ADD `coordinates` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `footprints` DROP COLUMN `coordinates`");
        await queryRunner.query("ALTER TABLE `footprints` ADD `coordinates` varchar(255) NOT NULL");
    }

}
