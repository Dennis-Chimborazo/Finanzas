import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'persons' })
export class Person {
    @PrimaryGeneratedColumn()
    personId: number;
    @Column()
    identificationType: string;
    @Column({ unique: true })
    dni: string;
    @Column()
    name: string;
    @Column()
    lastName: string;
    @Column()
    DateOfBirth: Date;
    @Column()
    addres: string;
    @Column()
    phoneNumber: string;
    @Column()
    profileFotoUrl: string;

}
