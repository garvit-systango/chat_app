import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // your DB username
      password: 'qwerty', // your DB password
      database: 'chat_db',  // your DB name
      autoLoadEntities: true,
      synchronize: true, 
    }),

    UsersModule,
    AuthModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
