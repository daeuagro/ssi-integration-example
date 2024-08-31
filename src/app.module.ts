import { Module } from '@nestjs/common';
import { CredentialsController } from './app.controller';
import { IssuerService } from './issuer.service';
import { DataStorageService } from './data-storage.service';
import { APISSIService } from './api-ssi.service';

@Module({
  imports: [], 
  controllers: [CredentialsController],
  providers: [
    DataStorageService, 
    APISSIService,
    {
      provide: IssuerService,
      useFactory: async(dds: DataStorageService, apiSSI: APISSIService) => {
        const service  = new IssuerService(dds, apiSSI);
        await service.initialize();
        return service;
      },
      inject: [DataStorageService, APISSIService]
    },
  ],
})
export class AppModule {}
