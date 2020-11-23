import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseImages1606169741082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO `images` (`id`, `targetId`, `image_name`, `is_done`, `time`, `instrument`, `thumb`, `exposure`, `target_name`, `target_desc`, `min_lat`, `max_lat`, `min_lon`, `max_lon`, `seq_id`, `min_res`, `central_body`, `obs_type`, `mission_phase`, `sequence_id`, `sequence_title`, `i_spice`, `t_spice`, `cal_flat`, `samples`, `lines`, `footprint`, `filter`, `shape`, `level`, `f_lines`, `f_samples`, `projection`, `version`, `orbit`, `nadir`, `filename`, `filename_a`, `i`, `e`, `phase`, `softVers`) VALUES(1, 1, 'FC-0032651_15013202050F', NULL, '2015-013T20:20:50.444', 'FC2', 'OpNav1', '1000.000', ' 1 CERES', NULL, '-85.60', '54.913', '-176.4', '177.09', NULL, '35706.', ' 1 CERES', 'NAV_CSA_OpNav1_001', 'Approach', NULL, 'OpNav1', 'Reconstructed', 'Reconstructed', ' 3.01', '85', '34', ' 162.7 -53.9, 188.4 -23.1, 196.0 -4.7, 216.4 20.0, 237.8 57.1, 268.2 65.9, 335.4 55.7, 355.7 24.1, 360.0 10.6, 360.0 -15.3, 360.0 -41.2, 360.0 -67.2, 360.0 -90.0, 0.0 -90.0, 0.0 -67.2, 0.0 -41.2, 0.0 -15.3, 0.0 10.6, 3.5 -0.6, 18.5 -28.4, 52.0 -60.7, 112.9 -73.7, 162.7 -53.9', '1', 'DTM_DLR_Global_-', '1B', '1024', '1024', 'Equirectangular', '1H', NULL, NULL, 'FC21B0032651_15013202050F1H', 'FC21A0032651_15013202050F1L', NULL, NULL, NULL, '2');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DROP TABLE `images`;");
    }

}
