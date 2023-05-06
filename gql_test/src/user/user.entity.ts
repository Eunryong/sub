import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
	@Field(() => Int)
	@PrimaryColumn()
	id: number;

	@Field(() => String)
	@Column()
	nick: string;

	@Field(() => String)
	@Column()
	email: string;

	@Field(() => String)
	@Column()
	profileUrl: string;

	@Field(() => Boolean, {defaultValue: false})
	@Column({default: false})
	twoFactorAuth: boolean;
}
