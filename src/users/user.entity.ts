
import { ObjectId , Entity, Column, ObjectIdColumn, BeforeInsert, AfterInsert, AfterUpdate, BeforeRemove, AfterLoad } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId; 

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;
  @Column()
  role: string;

  @Column()
createdAt: Date;

@Column()
updatedAt: Date;

  @BeforeInsert()
  beforeInsertActions() {
    console.log(`Before inserting user with email: ${this.email}`);
  }
  @AfterInsert()
  afterInsertActions() {
    console.log(`After inserting user with email: ${this.email}`);
  }
  @AfterUpdate()
  afterUpdateActions() {
    console.log(`After updating user with email: ${this.email}`);
  }
  @BeforeRemove()
  beforeRemoveActions() {
    console.log(`Before removing user with email: ${this.email}`);
  }
  @AfterLoad()
  afterLoadActions() {
    console.log(`User with email: ${this.email} has been loaded from the database`);
  }


}
