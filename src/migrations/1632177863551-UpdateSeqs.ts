import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateSeqs1632177863551 implements MigrationInterface {
    name = 'UpdateSeqs1632177863551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `seqs` CHANGE `is_done` `is_done` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `seqs` CHANGE `is_done` `is_done` tinyint NOT NULL");
    }

}
