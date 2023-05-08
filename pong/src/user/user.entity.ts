import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(['nick'])
export class User extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@Column({nullable: true})
	nick: string;

	@Column()
	email: string;

	@Column()
	profileUrl: string;

	@Column({default: false})
	twoFactorAuth: boolean;
}
