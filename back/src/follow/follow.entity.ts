import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follow extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	follower: number;

	@Column()
	follow: number;
}
