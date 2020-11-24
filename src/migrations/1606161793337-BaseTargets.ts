import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseTargets1606161793337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO `targets` (`id`, `name`, `version`, `date`, `fc`, `vir`, `note`, `status`, `comment`) VALUES(1, 'Ceres', 1.0, '', '', '', '', '', 'This is a comment for Ceres.');");
        queryRunner.query("INSERT INTO `targets` (`id`, `name`, `version`, `date`, `fc`, `vir`, `note`, `status`, `comment`) VALUES(2, '67P/Churyumov-Gerasimenko', 1.0, '', '', '', '', '', 'This is a comment for 67P.');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE `targets`;");
    }

}
