import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1594251283638 implements MigrationInterface {
    name = 'InitialMigration1594251283638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `meta` (`Version` int NOT NULL, `Date` varchar(255) NOT NULL, `FC` varchar(255) NOT NULL, `VIR` varchar(255) NOT NULL, `Note` varchar(255) NOT NULL, `Status` varchar(255) NOT NULL, `Comment` varchar(255) NOT NULL, PRIMARY KEY (`Version`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `seqs` (`id` int NOT NULL, `name` varchar(255) NOT NULL, `use_me` tinyint NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `seqs`");
        await queryRunner.query("DROP TABLE `meta`");
    }

}
