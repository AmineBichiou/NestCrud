import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'bson';

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
  async findRecentUsers() {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return await this.userRepo.find({ where: { createdAt: { $gte: sevenDaysAgo } } });
        }

async findOneById(id: string): Promise<User> {
  const Ot = new ObjectId(id);
  const user = await this.userRepo.findOne({ where: { _id: Ot } });
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

  // async update( id : string, dto: UpdateUserDto) {
  //   const exist = await this.findOneById(id);
  //   if (!exist) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const updated = Object.assign(exist, dto);
  //   return this.userRepo.save(updated);
  // } methode class use this in dev 

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
    async findUsersByRole(role: string) {
    return await this.userRepo.find({
      select:
        role === 'admin'
          ? ['id', 'email', 'role', 'createdAt', 'updatedAt']
          : ['id', 'email'],
    });
  }
  async findInactiveUsers() {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return await this.userRepo.find({
            where: { updatedAt: { $lt: sixMonthsAgo } }
          });
        }
      async findUsersByDomain(domain: string) {
          return await this.userRepo.find({ where: { email: { $regex: `@${domain}$` } } });
        }
      
      async countUsersByRole() {
          return await this.userRepo.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
          ]).toArray();
        }

      async findUsersByDateRange(startDate: Date, endDate: Date) {
          return await this.userRepo.find({ where: { createdAt: { $gte: startDate, $lte: endDate } } });
        }
      async findRecentUsersLimit(limit: number): Promise<User[]> {
          return await this.userRepo.find({
            order: { createdAt: 'DESC' },
            take: limit,
          });
        }
      async calculateAverageTimeBetweenCreateAndUpdate(): Promise<any> {
          const result = await this.userRepo.aggregate([
            {
              $project: {
                timeDiffInDays: {
                  $divide: [
                    { $subtract: ['$updatedAt', '$createdAt'] },
                    1000 * 60 * 60 * 24,
                  ],
                },
              },
            },
            { $group: { _id: null, averageDays: { $avg: '$timeDiffInDays' } } },
          ]).toArray();
       
          return result[0]['averageDays'] || 0;
        }

        async findPaginatedUsers(page: number, limit: number) {
          return await this.userRepo.find({ 
                skip: (page - 1) * limit, 
                take: limit });
        }

      async findSortedUsers() {
          return await this.userRepo.find({ order: { createdAt: 'DESC' } });
        }


        async findUsersWithMultipleSorting(): Promise<User[]> {
          return await this.userRepo.find({
            order: { role: 'ASC', createdAt: 'DESC' },
          });
        }

        async createUser(userDto: CreateUserDto) {
          const existingUser = await this.userRepo.findOne({ where: { email: userDto.email } });
          if (existingUser) {
            throw new Error('Un utilisateur avec cet email existe déjà.');
          }
          const user = this.userRepo.create(userDto);
          return await this.userRepo.save(user);
        }

        async updateUser(idUser: string, updateData: UpdateUserDto) {
          const existingUser = await this.userRepo.findOneById(idUser);

          if (!existingUser) {
            throw new Error('Utilisateur non trouvé');
          }
         const { id, ...userWithoutId } = existingUser;
          const updatedUser = { ...userWithoutId, ...updateData, updatedAt: new Date() };
          await this.userRepo.update(id, updatedUser);
          console.log(`Utilisateur ${id} mis à jour :`, updateData);
          return updatedUser;
        }


        async deactivateOldAccounts(): Promise<void> {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          await this.userRepo.updateMany(
            { updatedAt: { $lte: oneYearAgo } }, 
            { $set: { active: false } } 
          );
        }


        async updateUsersRoleByDomain(domain: string, newRole: string) {
          return await this.userRepo.updateMany(
            { email: { $regex: `@${domain}$` } },
            { $set: { role: newRole } }
          ); }












}
