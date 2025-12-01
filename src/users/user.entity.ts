import { Entity, Column, ObjectIdColumn, BeforeInsert, AfterInsert, AfterUpdate, BeforeRemove } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string; // MongoDB ObjectId

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;


}
