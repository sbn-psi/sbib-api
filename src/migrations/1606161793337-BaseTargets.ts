import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseTargets1606161793337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO `targets` (`id`, `name`, `version`, `date`, `model_path`, `material_path`, `image_basepath`, `fc`, `vir`, `note`, `status`, `comment`) VALUES(1, 'Ceres', 1.0, '', '/assets/ceres/ceres.obj', '/assets/ceres/ceres.mtl', 'https://sbib.psi.edu/data/PDS-Ceres', '', '', '', '', 'This is a comment for Ceres.');");
        queryRunner.query("INSERT INTO `targets` (`id`, `name`, `version`, `date`, `model_path`, `material_path`, `image_basepath`, `fc`, `vir`, `note`, `status`, `comment`) VALUES(2, '67P/Churyumov-Gerasimenko', 1.0, '', '/assets/67P.obj', '', 'https://sbib.psi.edu/data/PDS-67P', '', '', '', '', 'This is a comment for 67P.');");
        queryRunner.query("INSERT INTO `targets` (`id`, `name`, `version`, `date`, `model_path`, `material_path`, `image_basepath`, `fc`, `vir`, `note`, `status`, `comment`) VALUES(3, 'Eros', 1.0, '', '/assets/eros/eros.obj', '/assets/eros/eros.mtl', 'https://sbib.psi.edu/data/PDS-Eros', '', '', '', '', 'This is a comment for Eros.');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE `targets`;");
    }

}
