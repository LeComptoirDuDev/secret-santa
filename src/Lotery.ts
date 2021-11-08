export class Lotery {
    private participants: string[];

    constructor(participants: string[]) {
        this.participants = participants;
    }

    getAssociatedParticipants(): ParticipantAssociation[] {
        return [{
            giver: '',
            receiver: ''
        }, {
            giver: '',
            receiver: ''
        }, {
            giver: '',
            receiver: ''
        }];
    }
}

export interface ParticipantAssociation {
    giver: string;
    receiver: string;
}