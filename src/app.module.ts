import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './message/message.module';
import { Message } from './message/message.entity';
import { MoteurModule } from './moteur/moteur.module';
import { AudioModule } from './audio/audio.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';



@Module({
  imports: [UsersModule,MessagesModule, MoteurModule, AudioModule, GenerateurModule, PhareModule, 
    VehiculeModule,
    TypeOrmModule.forRoot({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'test',
  entities: [Message,User],
  synchronize: true,
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
