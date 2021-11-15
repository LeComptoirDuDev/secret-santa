import { ParticipantAssociation, Lotery } from "../src/Lotery"
import { importParticipantsList } from "../src/ImportParticipantsList";

describe("lotery", () => {

    let participantsList: string[];
    let associations: ParticipantAssociation[];
    let lotery: Lotery;

    beforeAll(
        () => {
            participantsList = importParticipantsList("data/participants_test.yaml");
            lotery = new Lotery(participantsList);
            associations = lotery.getAssociatedParticipants();
        }
    )

    it("should associate each participant to another one", () => {
        expect(associations.length).toBe(participantsList.length);
    })

    test("participants should be giver only one time", () => {
        participantsList.forEach(participant => {
            expect(associations.filter(asso => asso.giver === participant).length).toBe(1);
        })
    })

    test("participants should be receiver only one time", () => {
        participantsList.forEach(participant => {
            expect(associations.filter(asso => asso.receiver === participant).length).toBe(1);
        })
    })

    test("participants should not be receiver and giver at the same time", () => {
        participantsList.forEach(participant => {
            expect(associations.find(asso => asso.giver === participant)!.receiver).not.toBe(participant);
        })
    })

    test("associations have to be shuffled", () => {
        const givers = associations.map(association => association.giver);
        expect(givers.join('')).not.toBe(participantsList.join(''));
    })
});