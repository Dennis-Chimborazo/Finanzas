import { Account } from "src/account/entities/account.entity";
import { Contribution } from "src/contribution/entities/contribution.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'savings_goals'})
export class SavingsGoal {
    @PrimaryGeneratedColumn()
    goal_id:number;
    @Column()
    goal_name:string;
    @Column()    
    description:string;
    @Column()
    target_amount:number;
    @Column()
    category:string;
    @Column()
    start_date:Date;
    @Column()
    end_date:Date;
    @ManyToOne(()=>Account,(account)=>account.accountId)
    @JoinColumn({ name: 'account_id' })
    account:Account;   
    @OneToMany(() => Contribution, (contribution) => contribution.goalId)
    contributions: Contribution[]; 
}
