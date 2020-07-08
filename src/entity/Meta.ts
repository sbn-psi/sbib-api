import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("meta")
export class Meta {

    @PrimaryColumn({name: 'Version'})
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