import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	player1: number;

	@Column()
	player2: number;

	@Column()
	score1: number;

	@Column()
	score2: number;

	@Column()
	winner: number;

	@Column()
	isRank: boolean;
}
