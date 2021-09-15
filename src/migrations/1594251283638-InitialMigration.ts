import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1594251283638 implements MigrationInterface {
    name = 'InitialMigration1594251283638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `seqs` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255), `target_id` int NOT NULL, `use_me` tinyint, `is_useme` boolean, `is_done` boolean, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `meta` (`Version` int, `Date` varchar(255), `FC` varchar(255), `VIR` varchar(255), `Note` varchar(255), `Status` varchar(255), `Comment` varchar(255), PRIMARY KEY (`Version`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `images` (`id` int NOT NULL AUTO_INCREMENT, `image_name` varchar(255), `target_id` int NOT NULL, `is_done` tinyint, `time` varchar(255), `instrument` varchar(255), `thumb` varchar(255), `exposure` int, `target_name` varchar(255), `target_desc` varchar(255), `min_lat` int, `max_lat` int, `min_lon` int, `max_lon` int, `seq_id` varchar(255), `min_res` int, `central_body` varchar(255), `obs_type` varchar(255), `mission_phase` varchar(255), `sequence_id` varchar(255), `sequence_title` varchar(255), `i_spice` varchar(255), `t_spice` varchar(255), `cal_flat` varchar(255), `samples` int, `lines` int, `footprint` TEXT, `filter` varchar(255), `shape` varchar(255), `level` varchar(255), `f_lines` int, `f_samples` int, `projection` varchar(255), `version` varchar(255), `orbit` varchar(255), `nadir` varchar(255), `filename` varchar(255), `filename_a` varchar(255), `i` int, `e` int, `phase` int, `softVers` varchar(255), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `targets` (`id` int, `name` varchar(255), `version` varchar(255), `model_path` varchar(255), `material_path` varchar(255), `image_basepath` varchar(255), `date` varchar(255), `fc` varchar(255), `vir` varchar(255), `note` varchar(255), `status` varchar(255), `comment` varchar(255), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `footprints` (`id` int NOT NULL AUTO_INCREMENT, `footprints` TEXT, `imageName` varchar(255), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `seqs`");
        await queryRunner.query("DROP TABLE `meta`");
        await queryRunner.query("DROP TABLE `images`");
        await queryRunner.query("DROP TABLE `targets`");
        await queryRunner.query("DROP TABLE `footprints`");
    }

}
