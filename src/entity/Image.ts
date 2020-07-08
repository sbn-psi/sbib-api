import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("images")
export class Image {
    @Column()
    id: number;

    @PrimaryColumn({name: 'image_name'})
    imageName: string;

    @Column({name: 'is_done'})
    isDone: boolean;

    @Column()
    time: string;

    @Column()
    instrument: string;

    @Column()
    thumb: string;

    @Column()
    exposure: number;

    @Column({name: 'target_name'})
    targetName: string;

    @Column({name: 'target_desc'})
    targetDescription: string;

    @Column({name: 'min_lat'})
    minLat: number;

    @Column({name: 'max_lat'})
    maxLat: number;

    @Column({name: 'min_lon'})
    minLon: number;

    @Column({name: 'max_lon'})
    maxLon: number;

    @Column({name: 'seq_id'})
    seqId: string;

    @Column({name: 'min_res'})
    minRes: number;

    @Column({name: 'central_body'})
    centralBody: string;

    @Column({name: 'obs_type'})
    obsType: string;

    @Column({name: 'mission_phase'})
    missionPhase: string;

    @Column({name: 'sequence_id'})
    sequenceId: string;

    @Column({name: 'i_spice'})
    iSpice: string;

    @Column({name: 't_spice'})
    tSpice: string;

    @Column({name: 'cal_flat'})
    calFlat: string;

    @Column()
    samples: number;

    @Column()
    lines: number;

    @Column()
    footprint: string;

    @Column()
    filter: string;

    @Column()
    shape: string;

    @Column()
    level: string;

    @Column({name: 'f_lines'})
    fLines: number;

    @Column({name: 'f_samples'})
    fSamples: number;

    @Column()
    projection: string;

    @Column()
    version: string;

    @Column()
    orbit: string;

    @Column()
    nadir: string;

    @Column()
    filename: string;

    @Column()
    i: number;

    @Column()
    e: number;

    @Column()
    phase: number;

    url() {
        return `/images/${this.id}`
    }
}