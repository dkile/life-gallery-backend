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
import { Post } from "./post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  full_name: string;

  @Column({ type: "varchar", nullable: false })
  nick_name: string;

  @Column({ type: "varchar", nullable: false })
  kakao_id: string;

  @Column({ type: "int" })
  user_state: number;

  @OneToOne((type) => Post, { nullable: true })
  @JoinColumn({ name: "draft_post_id" })
  draft_post: Post;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
