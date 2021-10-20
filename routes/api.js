import express from 'express';
import fs from 'fs/promises';
import { v4 as UUIDv4 } from 'uuid';

//router for /api requests, responses are typically restful
const router = express.Router();

/**
 * Reads local database file, parses it, and returns it as an object
 * @async
 * @returns { Promise<object[]> } database object
 */
const readDataBase = async () => {
    let json;
    try {
        json = await fs.readFile('db/db.json', { encoding: 'utf8' }, (err, data) => {
            err ? console.error(err) : null;
            return data;
        });
        json = JSON.parse(json);
    } catch (error) {
        console.error('Retrieving DB failed', error);
    }
    return json;
};

/**
 * Given an object, the function writes the string to the database.
 * @param {object} newDataBase 
 */
const writeDataBase = (newDataBase) => {
    let dataBaseString = JSON.stringify(newDataBase, null, '    ');
    fs.writeFile('db/db.json', dataBaseString, (err) => {
        err ? console.error(err) : null;
    });
};

/**
 * GET responds with the JSON of the db
 */
router.get('/notes', async (req, res) => {
    const data = await readDataBase();
    res.json(data);
});

/**
 * Adds req JSON to DB, after adding new ID property, then responds with new DB
 */
router.post('/notes', async (req, res) => {
    //bind JSON from request
    const newNote = req.body;
    //add ID to JSON
    newNote.id = UUIDv4();
    //Read database file in, then add new object to it
    const dataBase = await readDataBase();
    dataBase.push(newNote);
    //Rewrite Database file to disk
    writeDataBase(dataBase)
    //respond with new database JSON
    res.json(dataBase);
});

router.delete('/notes/:id', async (req, res) => {
    //DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    const dataBase = await readDataBase();
    const filteredDB = dataBase.filter(({id}) => id != req.params.id)
    writeDataBase(filteredDB)
    res.send(`${req.params.id} deleted`);
});

//endpoint for mistaken requests
router.all('/', (req, res) => {
    res.status(400).send(`You need to add '/notes' to your request`);
});
export default router;