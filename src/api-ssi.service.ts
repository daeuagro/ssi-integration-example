import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class APISSIService {

    // URL para verificar el DID creado
    // https://demo.extrimian.com/sidetree-proxy/resolve/did:quarkid:EiBFnpVoRI9EyxSXqbISkSxtk5GEeJOVpWs7_6CnRCFPkw

    baseUrl: string = "https://sandbox-ssi.extrimian.com/v1";
    ws = "https://sandbox-ssi-ws.extrimian.com/";
    webhook ="https://39f4-187-184-16-79.ngrok-free.app";

    constructor() {}

    async createDID(): Promise<{did: string}> {
        const result = await axios.put(`${this.baseUrl}/dids/quarkid`,{
            websocket: this.ws,
            webhook: this.webhook,
            didMethod: "did:quarkid"
        }).catch((error) => {
            console.error(error);
            return null;
        });

        return {
            did: result.data.did
        }
    }

    // Creamos una función que nos devuelva la invitación  a través de un QR para ontener tu DID
    async getIssuanceInvitationCode(body: any): Promise< {invitationId: string, oobContectData: string} > {
        
        const result = await axios.put(`${this.baseUrl}/credentialsbbs/wacioob`, body)
                            .catch((error) => {
                                console.error(error);
                                return null;
                            });
        return result.data;
       
    }
   

}