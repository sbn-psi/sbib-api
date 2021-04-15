import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("targets")
export class Target {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'Name'})
    name: string;

    @Column({name: 'Version'})
    version: number;

    @Column({name: 'Date'})
    date: string;

    @Column({name: 'FC'})
    fc: string;

    @Column({name: 'VIR'})
    vir: string;

    @Column({name: 'Note'})
    note: string;

    @Column({name: 'Status'})
    status: string;

    @Column({name: 'Comment'})
    comment: string;

    @Column({name: 'model_path'})
    modelPath: string;

    @Column({name: 'material_path'})
    materialPath: string;

    @Column({name: 'image_basepath'})
    imagePath: string;
}