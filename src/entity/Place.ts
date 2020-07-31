import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Target} from './Target'

@Entity("places")
export class Place {
    private static requiredKeys: (keyof Place)[] = ['name', 'centerLat', 'centerLon']

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Target)
    target: Target

    @Column({name: 'Name'})
    name: string

    @Column({name: 'Target'})
    targetPlace: string

    @Column({name: 'Diameter', type: 'double'})
    diameter: number

    @Column({name: 'centerlat', type: 'double'})
    centerLat: number

    @Column({name: 'centerlon', type: 'double'})
    centerLon: number

    @Column({name: 'CoordinateSys'})
    coordinateSys: string

    @Column({name: 'Approval'})
    approval: string

    @Column({name: 'Origin'})
    origin: string

    @Column({name: 'ApprovalDate', type: 'date'})
    approvalDate: Date

    static validate(obj: any) {
        const expectedKeys = Place.requiredKeys as string[]
        const presentKeys = Object.keys(obj)
        return expectedKeys.length <= presentKeys.length
            && expectedKeys.every(key => presentKeys.includes(key))
    }
}