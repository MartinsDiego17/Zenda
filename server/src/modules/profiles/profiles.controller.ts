import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }
  @Get()
  async findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ userId: id });
  }
}
