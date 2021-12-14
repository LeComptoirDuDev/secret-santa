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

app.set('views', './views')
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/:giver', (req, res) => {
    let association = associations?.find(asso => req.params.giver.toLowerCase() === asso.giver.toLowerCase())
    if (!association) {
        res.status(404).render("404");
    }
    res.render('display', { ...association });
})

app.listen(3000)
