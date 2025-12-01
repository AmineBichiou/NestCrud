import { Entity, Column, ObjectIdColumn, BeforeInsert, AfterInsert, AfterUpdate, BeforeRemove } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string; 

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;


}
