import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { Footprint } from "./Footprint";

@Entity("images")
export class Image {

    static shortKeys: (keyof Image)[] = ['id', 'imageName', 'filename', 'targetId', 'minLat', 'maxLat', 'minLon', 'maxLon', 'footprint']
    private static requiredKeys: (keyof Image)[] = ['id', 'targetId', 'imageName', 'minLat', 'minLon', 'maxLat', 'maxLon', 'exposure', 'time']

    @PrimaryGeneratedColumn('increment')
    id: number

    @Index()
    @Column({name: 'image_name'})
    imageName: string

    @Column({name: 'is_done'})
    isDone: boolean

    @Column()
    time: string

    @Column()
    instrument: string

    @Column()
    thumb: string

    @Column()
    exposure: number

    @Column({name: 'target_name'})
    targetName: string

    @Column({name: 'target_id'})
    targetId: number

    @Column({name: 'target_desc'})
    targetDescription: string

    @Column({name: 'min_lat'})
    minLat: number

    @Column({name: 'max_lat'})
    maxLat: number

    @Column({name: 'min_lon'})
    minLon: number

    @Column({name: 'max_lon'})
    maxLon: number

    @Column({name: 'seq_id'})
    seqId: string

    @Column({name: 'min_res'})
    minRes: number

    @Column({name: 'central_body'})
    centralBody: string

    @Column({name: 'obs_type'})
    obsType: string

    @Column({name: 'mission_phase'})
    missionPhase: string

    @Column({name: 'sequence_id'})
    sequenceId: string

    @Column({name: 'sequence_title'})
    sequenceTitle: string

    @Column({name: 'i_spice'})
    iSpice: string

    @Column({name: 't_spice'})
    tSpice: string

    @Column({name: 'cal_flat'})
    calFlat: string

    @Column()
    samples: number

    @Column()
    lines: number

    @Column("text")
    footprint: string

    @OneToMany(() => Footprint, footprint => footprint.image)
    footprints: Footprint[]

    @Column()
    filter: string

    @Column()
    shape: string

    @Column()
    level: string

    @Column({name: 'f_lines'})
    fLines: number

    @Column({name: 'f_samples'})
    fSamples: number

    @Column()
    projection: string

    @Column()
    version: string

    @Column()
    orbit: string

    @Column()
    nadir: string

    @Column()
    filename: string

    @Column({name: 'filename_a'})
    filenameA: string

    @Column()
    i: number

    @Column()
    e: number

    @Column()
    phase: number

    @Column()
    softVers: string

    static validate(obj: any) {
        const expectedKeys = Image.requiredKeys as string[]
        const presentKeys = Object.keys(obj)
        return expectedKeys.length <= presentKeys.length
            && expectedKeys.every(key => presentKeys.includes(key))
    }
}
