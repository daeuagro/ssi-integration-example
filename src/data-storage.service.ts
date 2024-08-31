import { Injectable } from "@nestjs/common";
import {existsSync, readFileSync, writeFileSync } from "fs";

@Injectable()
export class DataStorageService {

    constructor() {
       
    }

    saveDID(did: string) {
        const data = this.getFile();
        data.issuerDID = did;
        this.writeFile(data);
    }

    getDID(): string {
        const data = this.getFile();
        return data.issuerDID;
    }

    private getFile(): any {
        if(!existsSync("server-data.json")) {
            return new DataModel();
        }

        const file = readFileSync("server-data.json", {encoding: "utf-8"});

        if(file) {
            return JSON.parse(file) as DataModel;
        } else {
            return new DataModel();
        }
    }

    private writeFile(data: DataModel) {
        writeFileSync("server-data.json", JSON.stringify(data), {encoding: "utf-8"});
    }

}

export class DataModel {
    issuerDID: string;
}