import { Person } from "src/people/entities/person.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    userId?: number;
    @Column()
    firebaseUid: string;
    @Column()
    email: string;
    @OneToOne(() => Person, (person) => person.personId)
    @JoinColumn({ name: 'person_id' })
    personId: Person | null;
}
