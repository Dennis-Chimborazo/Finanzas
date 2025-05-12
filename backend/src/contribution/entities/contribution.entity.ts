import { Account } from "src/account/entities/account.entity";
import { SavingsGoal } from "src/savings_goal/entities/savings_goal.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'contributions'})
export class Contribution {
    @PrimaryGeneratedColumn()
    contribution_id?:number;
    @Column("decimal",{precision:10,scale:2})
    amount:number
    @Column()
    contribution_date:Date
    @Column()
    contributionType:string;  // Type of contribution ('goal' or 'account').
    @ManyToOne(()=>SavingsGoal,(sg)=>sg.contributions)
    @JoinColumn({ name: 'goal_id' })
    goalId:SavingsGoal | null;
    @ManyToOne(()=>Account,(ac)=>ac.accountId)
    accountId:Account | null;
}
