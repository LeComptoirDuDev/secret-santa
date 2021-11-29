import { importAssociations } from "../src/ImportAssociations";

describe("import associations", () => {
    let associations;

    beforeEach(() => {
        associations = importAssociations("test/data/example_associations_test.json");
    });

    it("should throw an error if no associations file found", () => {
        expect(() => importAssociations('test/data/fichier_inexistant.json')).toThrowError('There is an issue with associations file');
    })

    it("should return empty array if no associations in file", () => {
        let associations = importAssociations("test/data/empty_associations_file.json");
        expect(associations).toEqual([]);
    })

    it("should return associations array if saved associations in file", () => {


    })
})