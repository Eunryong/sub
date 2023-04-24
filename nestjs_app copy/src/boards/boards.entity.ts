import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

@Entity() // 해당 클래스가 엔티티임을 나타내줌
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // 해당 변수가 엔티티의 기본 키 열 임을 알려줌
    id: number;

    @Column() // 해당 변수가 엔티티의 열 중 하나임을 알려줌
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;

    @Column()
    userId: number;
}
