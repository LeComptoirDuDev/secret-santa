export class Lotery {
    private participants: string[];

    constructor(participants: string[]) {
        this.participants = participants;
    }

    getAssociatedParticipants(): ParticipantAssociation[] {
        return this.participants.map(participant => ({
            giver: participant,
            receiver: ''
        }));
    }
}

export interface ParticipantAssociation {
    giver: string;
    receiver: string;
}