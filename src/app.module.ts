import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';


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
      synchronize: true, // Only for dev. Set false in production!
    }),

    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
