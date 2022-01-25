// src/modules/memo/entity.ts
import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./user";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 40, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  content: string;

  @Column({ type: "varchar", nullable: false })
  image_link: string;

  @Column({ type: "int" })
  draft_state: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
