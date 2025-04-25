import { Person } from "src/people/entities/person.entity";
import { SavingsGoal } from "src/savings_goal/entities/savings_goal.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'accounts' })
export class Account {
    @PrimaryGeneratedColumn()
    accountId?: number;
    @Column({ default: null })
    accountNumber?: string;
    @Column()
    accountType: string; //type-->scheduled, transactional savings
    @Column()
    status: string;
    @Column()
    openingDate: Date;
    @Column({ default: null })
    closingDate?: Date;
    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    current_balance: number;
    @ManyToOne(() => Person, (person) => person.personId)
    @JoinColumn({ name: 'person_id' })
    personId: Person;
    @OneToMany(() => SavingsGoal, (savingsGoal) => savingsGoal.account)
    savingsGoals: SavingsGoal[];  // Aquí defines la relación uno a muchos con SavingsGoal
}
