import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  private nextId = this.users.length + 1;

  findAll(filterStatus?: string): User[] {
    if (!filterStatus) return this.users;
    return this.users.filter(u => u.status === filterStatus);
  }

  findById(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`Utilisateur avec id ${id} introuvable.`);
    return user;
  }

  create(createDto: CreateUserDto, headerInfo?: string): User {
    const newUser: User = {
      id: this.nextId++,
      username: createDto.username,
      email: createDto.email,
      status: createDto.status ?? 'inactive',
    };
    // headerInfo peut être utilisé ici si nécessaire (log, audit...), par ex console.log
    if (headerInfo) {
      // exemple simple
      console.log('Header Authorization reçu:', headerInfo);
    }
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`Utilisateur avec id ${id} introuvable.`);
    const updated = { ...this.users[userIndex], ...updateDto };
    this.users[userIndex] = updated;
    return updated;
  }

  remove(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`Utilisateur avec id ${id} introuvable.`);
    this.users.splice(idx, 1);
  }

  findActiveByStatus(status: string): User[] {
    return this.users.filter(u => u.status === status);
  }
}
