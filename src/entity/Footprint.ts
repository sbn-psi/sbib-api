import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("footprints")
export class Footprint {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    coordinates: string;

    @Column()
    imageName: string
}