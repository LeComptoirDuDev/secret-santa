export class Lotery {
    private participants: string[];

    constructor(participants: string[]) {
        this.participants = participants;
    }

    getAssociatedParticipants(): ParticipantAssociation[] {
        const receiverList: string[] = [...this.participants];
        receiverList.push(receiverList.shift() ?? '');


        return this.participants.map((participant, index) => ({
            giver: participant,
            receiver: receiverList[index]
        }));
    }
}

export interface ParticipantAssociation {
    giver: string;
    receiver: string;
}