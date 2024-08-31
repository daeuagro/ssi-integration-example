import { Injectable } from '@nestjs/common';
import { DataStorageService } from './data-storage.service';
import { APISSIService } from './api-ssi.service';


import  issuerStyles from './issuer.styles.json';
import outputDescriptor from './output-descriptor.json';

@Injectable()
export class IssuerService {
  did: string;
 
  constructor(private readonly dataStorageService: DataStorageService,
    private apiSSIService: APISSIService){

    }

    async initialize(){
      let did = await this.dataStorageService.getDID();

      if(!did){
        const result = await this.apiSSIService.createDID();
        did = result.did;
        this.dataStorageService.saveDID(did);
      }

      this.did = did;

      console.log("DID: ", this.did);

    }
    
    // Creamos el código de la invitacion para obtener el DID
    async createInvitationCode(params: CreateCredentialPayload){
      const credential = this.getCredential(params);

      const result = {
        did: this.did,
        oneTimeUse: true,
        vc: credential,
        outputDescriptor: outputDescriptor,
        issuer: issuerStyles
      }

      return await this.apiSSIService.getIssuanceInvitationCode(result);

    }

    // Función para crear la credencial
    getCredential(params: CreateCredentialPayload){ 
      return {
            "@context": [
              "https://www.w3.org/2018/credentials/v1",
              "https://www.w3.org/2018/credentials/examples/v1",
              "https://contextvc.blob.core.windows.net/v100/passport.json"
            ],
            "id": (new Date().getTime()).toString(),
            "type": ["VerifiableCredential", "Alumno"],
            "issuer": {
                "id": this.did,
                "name": "Universidad Autónoma de Guerrero"
              },
            "issuanceDate": (new Date()).toString(),
            "expirationDate": params.vaidTo,
            "credentialSubject": {
                name: params.name,
                matricula: params.matricula,
                UnidadAcademica: params.unidadAcademica,
                ProgramaEducativo: params.programaEducativo,
                validFrom: params.validFrom,
                vaidTo: params.vaidTo
              }
          }

    }

}

export class CreateCredentialPayload {
  name: string;
  matricula: string;
  unidadAcademica: string;
  programaEducativo: string;
  validFrom: string;
  vaidTo: string;
}
