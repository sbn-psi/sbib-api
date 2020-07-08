import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1594251283638 implements MigrationInterface {
    name = 'InitialMigration1594251283638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `images` (`id` int NOT NULL, `image_name` varchar(255) NOT NULL, `is_done` tinyint NOT NULL, `time` varchar(255) NOT NULL, `instrument` varchar(255) NOT NULL, `thumb` varchar(255) NOT NULL, `exposure` int NOT NULL, `target_name` varchar(255) NOT NULL, `target_desc` varchar(255) NOT NULL, `min_lat` int NOT NULL, `max_lat` int NOT NULL, `min_lon` int NOT NULL, `max_lon` int NOT NULL, `seq_id` varchar(255) NOT NULL, `min_res` int NOT NULL, `central_body` varchar(255) NOT NULL, `obs_type` varchar(255) NOT NULL, `mission_phase` varchar(255) NOT NULL, `sequence_id` varchar(255) NOT NULL, `i_spice` varchar(255) NOT NULL, `t_spice` varchar(255) NOT NULL, `cal_flat` varchar(255) NOT NULL, `samples` int NOT NULL, `lines` int NOT NULL, `footprint` varchar(255) NOT NULL, `filter` varchar(255) NOT NULL, `shape` varchar(255) NOT NULL, `level` varchar(255) NOT NULL, `f_lines` int NOT NULL, `f_samples` int NOT NULL, `projection` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `orbit` varchar(255) NOT NULL, `nadir` varchar(255) NOT NULL, `filename` varchar(255) NOT NULL, `i` int NOT NULL, `e` int NOT NULL, `phase` int NOT NULL, PRIMARY KEY (`image_name`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `meta` (`Version` int NOT NULL, `Date` varchar(255) NOT NULL, `FC` varchar(255) NOT NULL, `VIR` varchar(255) NOT NULL, `Note` varchar(255) NOT NULL, `Status` varchar(255) NOT NULL, `Comment` varchar(255) NOT NULL, PRIMARY KEY (`Version`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `seqs` (`id` int NOT NULL, `name` varchar(255) NOT NULL, `use_me` tinyint NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `seqs`");
        await queryRunner.query("DROP TABLE `meta`");
        await queryRunner.query("DROP TABLE `images`");
    }

}
