import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Record {
	@Field(() => Int, {nullable: true})
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Int)
	@Column()
	leftId: number;

	@Field(() => Int)
	@Column()
	rightId: number;

	@Field(() => Int)
	@Column()
	leftScore: number;

	@Field(() => Int)
	@Column()
	rightScore: number;

	@Field(() => Int)
	@Column()
	winner: number;
}
