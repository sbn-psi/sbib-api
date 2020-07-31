import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import {Target} from './Target'

@Entity("seqs")
export class Seq {
    private static requiredKeys: (keyof Seq)[] = ['id', 'name']

    @PrimaryColumn()
    id: number = null

    @ManyToOne(type => Target)
    target: Target = null

    @Column()
    name: string = null

    @Column({name: 'use_me'})
    useMe: boolean = null

    @Column({name: 'is_useme'})
    isUseMe: boolean = null

    @Column({name: 'is_done'})
    isDone: boolean = null

    static validate(obj: any) {
        const expectedKeys = Seq.requiredKeys as string[]
        const presentKeys = Object.keys(obj)
        return expectedKeys.length <= presentKeys.length
            && expectedKeys.every(key => presentKeys.includes(key))
    }
}