import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { Image } from "./Image";

@Entity("footprints")
export class Footprint {

    @Index()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    coordinates: string;

    @ManyToOne(() => Image, images => images.footprints)
    image: Image;
}