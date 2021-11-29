import express from 'express';
import { Lotery } from "./Lotery"

const app = express();

const filePathParticipants = "./data/participants.yaml";
const filePathAssociations = "./data/associations.json";

const lotery = new Lotery()

app.get('/:user', (req, res) => {
    res.send(`Coucou ${req.params.user}`)
})

app.listen(3000)