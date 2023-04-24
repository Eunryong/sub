import { Board } from "src/boards/boards.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username']) // db 단에서 username 이 중복이 될 수 없도록 함
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // type : 타입
    // inverseSide : board 에서 user 로 접근하기 위해 board.user 로 접근하도록 함
    // option : true 일때, user 정보를 가져오면 board 정보도 가져오게 됨
    @OneToMany(type => Board, board => board.user, {eager: true})
    boards: Board[];

    async validatePassword(password: string): Promise<boolean> {
        let isValid = await bcrypt.compare(password, this.password)
        return isValid;
    }
}
