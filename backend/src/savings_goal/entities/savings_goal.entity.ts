import { Account } from "src/account/entities/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    account:Account;   
}
