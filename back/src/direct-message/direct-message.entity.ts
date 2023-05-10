import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DirectMessage extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	from: number;

	@Column()
	to: number;

	@Column()
	text: string;
}
