// modules/user/entity.ts
import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Post } from "../post/entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  full_name: string;

  @Column({ type: "varchar", nullable: false })
  nick_name: string;

  @Column({ type: "varchar", nullable: false })
  kakao_account: string;

  @Column()
  user_state: number;

  @OneToOne((type) => Post)
  @JoinColumn({ name: "draft_post_id" })
  draft_post: Post;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
