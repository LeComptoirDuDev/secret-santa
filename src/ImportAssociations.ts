import { load } from "js-yaml";
import * as fs from "fs";
import { ParticipantAssociation } from "./Lotery";

export function importAssociations(filePath: string): ParticipantAssociation[] | undefined {
    let associations: ParticipantAssociation[];

    try {
        load(fs.readFileSync(filePath, 'utf8'))
        const fileContent: ConfigFile = load(fs.readFileSync(filePath, "utf8")) as ConfigFile;
        associations = fileContent.associations ?? [];
    } catch (e) {
        throw new Error("There is an issue with associations file");
    }

    return associations;
}

export interface ConfigFile {
    associations: ParticipantAssociation[];
}