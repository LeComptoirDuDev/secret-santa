import { importParticipantsList } from "../src/ImportParticipantsList";

describe("participants import", () => {

    let participantsList: string[];

    beforeEach(() => {
        participantsList = importParticipantsList("test/data/participants_test.yaml");
    })

    it("should exists", () => {
        expect(participantsList).not.toBeUndefined();
    })
    it("should import participants array from file", () => {
        expect(participantsList.length).toBe(3);
        expect(participantsList).toContain("Virgil");
        expect(participantsList).toContain("Pierre");
        expect(participantsList).toContain("Sylvain");
    })

    it("should send an error if file does not exist", () => {
        expect(() => importParticipantsList('toto.txt')).toThrow();
    })

    it("should throw an error if empty participant list", () => {
        expect(() => importParticipantsList('test/data/empty_participant_test.yaml')).toThrowError('This participants file is empty');
    })

})