import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(['nick'])
export class User extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@Column()
	nick: string;

	@Column()
	email: string;

	@Column()
	profileUrl: string;

	@Column()
	twoFactorAuth: boolean;
}
