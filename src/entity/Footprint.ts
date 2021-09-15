import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Image } from './Image';

@Entity("footprints")
export class Footprint {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @ManyToOne(() => Image, image => image.footprints)
    footprints: string;

    @Column()
    imageName: string
}