import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { ObjectID } from 'bson';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: MongoRepository<User>,
  ) {}
  async create(dto: CreateUserDto) {
    const user = this.userRepo.create({
      ...dto,
      active: false,
    });
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    if (!users || users.length === 0) {
      return [];

    }
    return users;
  }

async findOneById(id: string): Promise<User> {
  const ObjectId = new ObjectID(id);
  const user = await this.userRepo.findOne({ where: { _id: ObjectId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
}

// async findOneById(id: string): Promise<User> {
//   const user = await this.userRepo.findOneBy(id);
//   if (!user) {
//     throw new NotFoundException('User not found');
//   }
//   return user;
// } Methode 2 works too

  findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  findActive() {
    return this.userRepo.find({ where: { active: true } });
  }
  async update(id: string, dto: UpdateUserDto) {
    await this.userRepo.update(id, dto);
    return this.findOneById(id);
  }
  async remove(id: string) {
    const user = await this.findOneById(id);
    if (!user) {
      return { deleted: false };
    }
    await this.userRepo.remove(user);
    return { deleted: true };
  }

  async activate(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) return null;

    if (user.password !== password) return null;

    user.active = true;
    await this.userRepo.save(user);

    return user;
  }
}
