import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactDTO } from './admin.dto';
import { ContactEntity } from './admin.entity';
import { AdminService } from './admin.service';


@Controller('contacts')
export class ContactController {
  constructor(private contactService: AdminService) {}

  @Post('/contact')
  async createContact(@Body() data: ContactDTO): Promise<ContactEntity> {
    return this.contactService.createContact(data);
  }

  @Get()
  async getAllContacts(): Promise<ContactEntity[]> {
    return this.contactService.getAllContacts();
  }
}
