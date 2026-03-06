import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, AuthGuard, RolesGuard],
  exports: [ProfilesService]
})
export class ProfilesModule {}
