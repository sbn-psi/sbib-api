import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("target")
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
}