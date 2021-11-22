import _ from 'lodash';
import fs from 'fs';

export class Lotery {
    private participants: string[];
    private associationsFilePath: string;

    constructor(participants: string[], associationsFilePath: string) {
        do {
            this.participants = _.shuffle(participants);
            this.associationsFilePath = associationsFilePath;
        } while (this.arraysAreEquals(this.participants, participants))
    }

    associateParticipants(): ParticipantAssociation[] {
        const receiverList: string[] = [...this.participants];
        receiverList.push(receiverList.shift() ?? '');

        const associations: ParticipantAssociation[] = this.participants.map((participant, index) => ({
            giver: participant,
            receiver: receiverList[index]
        }));

        this.saveAssociations(associations)

        return associations;
    }

    arraysAreEquals(array1: string[], array2: string[]): boolean {
        return array1.toString() === array2.toString();
    }

    saveAssociations(associations: ParticipantAssociation[]): void {
        fs.writeFileSync(this.associationsFilePath, JSON.stringify(associations))
    }

    readAssociations(): ParticipantAssociation[] {
        const associations: ParticipantAssociation[] = JSON.parse(fs.readFileSync(this.associationsFilePath).toString());
        return associations
    }
}

export interface ParticipantAssociation {
    giver: string;
    receiver: string;
}