import { ParticipantAssociation, Lotery } from "../src/Lotery"
import { importParticipantsList } from "../src/ImportParticipantsList";
import fs from "fs";

describe("lotery", () => {

    let participantsList: string[];
    let associations: ParticipantAssociation[];
    let lotery: Lotery;
    const associationsFilePath = 'test/data/associations_test.json';
    const participantsListFilePath = 'test/data/participants_test.yaml';

    beforeAll(
        () => {
            participantsList = importParticipantsList(participantsListFilePath);
            lotery = new Lotery(participantsList, associationsFilePath);
            associations = lotery.associateParticipants();
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

    describe("associations saving", () => {
        afterAll(() => {
            if (fs.existsSync(associationsFilePath)) {
                fs.unlinkSync(associationsFilePath);
            }
        });

        it("should save associations in file", () => {
            const saveAssociations = jest.spyOn(lotery, 'saveAssociations');
            const associations = lotery.associateParticipants();
            expect(saveAssociations).toHaveBeenNthCalledWith(1, associations);
            expect(fs.existsSync(associationsFilePath)).toBeTruthy();

            const savedAssociations = JSON.parse(fs.readFileSync(associationsFilePath).toString());

            expect(savedAssociations).toEqual(associations);
        })

        it("should restore associations from file", () => {
            lotery = new Lotery(participantsList, 'test/data/example_associations_test.json');
            const savedAssociations = lotery.readAssociations();
            expect(
                savedAssociations
                    .find(association => association.giver === "Sylvain")!
                    .receiver
            ).toBe("Virgil");
            expect(
                savedAssociations
                    .find(association => association.giver === "Virgil")!
                    .receiver
            ).toBe("Pierre");
            expect(
                savedAssociations
                    .find(association => association.giver === "Pierre")!
                    .receiver
            ).toBe("Sylvain");
        })
    })
});