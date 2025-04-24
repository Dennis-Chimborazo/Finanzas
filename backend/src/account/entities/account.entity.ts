import { Person } from "src/people/entities/person.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'accounts'})
export class Account {
    @PrimaryGeneratedColumn()
    accountId:number;
    @Column()
    accountNumber:string;
    @Column()
    accountType:string; //type-->scheduled, transactional savings
    @Column()
    status:string;
    @Column()
    openingDate:Date;
    @Column()
    closingDate:Date;
    @Column("decimal",{precision:10,scale:2})
    current_balance:number;
    @ManyToOne(()=>Person,(person)=>person.personId)
    @JoinColumn({name:'person_id'})
    personId:Person
}
