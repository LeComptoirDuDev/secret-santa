import _ from 'lodash';

export class Lotery {
    private participants: string[];

    constructor(participants: string[]) {
        do {
            this.participants = _.shuffle(participants);
        } while (this.arraysAreEquals(this.participants, participants))
    }

    getAssociatedParticipants(): ParticipantAssociation[] {
        const receiverList: string[] = [...this.participants];
        receiverList.push(receiverList.shift() ?? '');

        return this.participants.map((participant, index) => ({
            giver: participant,
            receiver: receiverList[index]
        }));
    }

    arraysAreEquals(array1: string[], array2: string[]): boolean {
        return array1.toString() === array2.toString();
    }
}

export interface ParticipantAssociation {
    giver: string;
    receiver: string;
}