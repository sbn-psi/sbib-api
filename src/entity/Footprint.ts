import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Image } from "./Image";

@Entity("footprints")
export class Footprint {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    coordinates: string;

    @ManyToOne(() => Image, images => images.footprints)
    image: Image;
}