import * as fs from "fs";
import { ParticipantAssociation } from "./Lotery";

export function importAssociations(filePath: string): ParticipantAssociation[] | undefined {
    let associations: ParticipantAssociation[];

    try {
        const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
        associations = fileContent ?? [];
    } catch (e) {
        throw new Error("There is an issue with associations file");
    }

    return associations;
}