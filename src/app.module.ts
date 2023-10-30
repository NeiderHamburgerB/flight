import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './modules';
import { EnvModule } from './config/env/env.module';
import { DatabaseModule } from './config/database/database.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
