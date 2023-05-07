import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Record {
	@Field(() => Int, {nullable: true})
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => User)
	@ManyToOne(() => User)
	leftId: User;

	@Field(() => User)
	@ManyToOne(() => User)
	rightId: User;

	@Field(() => Int)
	@Column()
	leftScore: number;

	@Field(() => Int)
	@Column()
	rightScore: number;

	@Field(() => User)
	@ManyToOne(() => User)
	winner: User;
}
