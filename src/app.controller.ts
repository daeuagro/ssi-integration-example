import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCredentialPayload, IssuerService } from './issuer.service';

@Controller("credentials")
export class CredentialsController {
  
  constructor(private readonly issuerService: IssuerService) {}

  @Get()
  getHello(): string {
    return "Hello";
  }

  @Post()
  async getIssuanceInvitationCode(@Body() body: CreateCredentialPayload) {
    const result = await this.issuerService.createInvitationCode(body);
    console.log("Result de QR: ", result);
    return result;
  }
}
