import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("seqs")
export class Seq {
    @Column()
    id: number;

    @PrimaryColumn()
    name: string;

    @Column({name: 'use_me'})
    useMe: boolean;
}