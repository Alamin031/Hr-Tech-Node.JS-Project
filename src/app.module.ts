import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule,CustomerModule,TypeOrmModule.forRoot(
  { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'hridoy09',
    database: 'Hr_Tech',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
