import { load } from "js-yaml";
import * as fs from "fs";

export function importParticipantsList(filePath: string): string[] {
    try {
        load(fs.readFileSync(filePath, 'utf8'))
        const fileContent: ConfigFile = load(fs.readFileSync(filePath, "utf8")) as ConfigFile;

        return fileContent.participants;
    } catch {
        throw new Error("Il y a un soucis avec le fichier de participants");
    }
}

export interface ConfigFile {
    participants: string[];
}