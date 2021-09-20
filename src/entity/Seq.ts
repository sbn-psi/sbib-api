import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";

@Entity("seqs")
export class Seq {
    private static requiredKeys: (keyof Seq)[] = ['id', 'name', 'targetId']

    @PrimaryColumn()
    id: number = null

    @Column()
    targetId: number = null

    @Column()
    name: string = null

    @Column({name: 'use_me'})
    useMe: boolean = null

    @Column({name: 'is_useme'})
    isUseMe: boolean = null

    @Column({name: 'is_done', default: false})
    isDone: boolean = null

    static validate(obj: any) {
        const expectedKeys = Seq.requiredKeys as string[]
        const presentKeys = Object.keys(obj)
        return expectedKeys.length <= presentKeys.length
            && expectedKeys.every(key => presentKeys.includes(key))
    }
}