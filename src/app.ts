import express from 'express';
import * as fs from 'fs';
import { importAssociations } from './ImportAssociations';
import { importParticipantsList } from './ImportParticipantsList';
import { Lotery, ParticipantAssociation } from "./Lotery"

const app = express();

const filePathParticipants = "./data/participants.yaml";
const filePathAssociations = "./data/associations.json";
let associations: ParticipantAssociation[] | undefined;


function initServer() {

    associations = getAssociations();

}

function getAssociations(): ParticipantAssociation[] | undefined {

    if (fs.existsSync(filePathAssociations)) {
        associations = importAssociations(filePathAssociations);
    }

    if (!associations) {
        let participantsList = importParticipantsList(filePathParticipants);
        let lotery = new Lotery(participantsList, filePathAssociations);
        associations = lotery.associateParticipants();
    }

    return associations;
}

initServer();

app.get('/:giver', (req, res) => {
    let association = associations?.find(asso => asso.giver === req.params.giver)
    res.send(`Coucou ${association?.giver}, tu fais un cadeau à ${association?.receiver}`)
})

app.listen(3000)
