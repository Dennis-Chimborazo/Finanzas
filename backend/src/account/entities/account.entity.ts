import { Person } from "src/people/entities/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'accounts' })
@Unique(['accountType','personId'])
export class Account {
    @PrimaryGeneratedColumn()
    accountId?: number;
    @Column({default:null})
    accountNumber?: string;
    @Column()
    accountType: string; //type-->scheduled, transactional savings
    @Column()
    status: string;
    @Column()
    openingDate: Date;
    @Column({default:null})
    closingDate?: Date;
    @Column("decimal", { precision: 10, scale: 2 ,default:0})
    current_balance: number;
    @ManyToOne(() => Person, (person) => person.personId)
    @JoinColumn({ name: 'person_id' })
    personId: Person;
}
