import { load } from "js-yaml";
import * as fs from "fs";

export function importParticipantsList(filePath: string): string[] {
    let participants: string[] = [];

    try {
        load(fs.readFileSync(filePath, 'utf8'))
        const fileContent: ConfigFile = load(fs.readFileSync(filePath, "utf8")) as ConfigFile;
        participants = fileContent.participants
    } catch (e) {
        throw new Error("There is an issue with participants file");
    }
    if (participants?.length == null) {
        throw new Error("This participants file is empty");
    }
    return participants;
}

export interface ConfigFile {
    participants: string[];
}