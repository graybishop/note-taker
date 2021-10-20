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
 * Responds with DB
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

/**
 * Deletes note with given ID from the database. 
 */
router.delete('/notes/:id', async (req, res) => {
    const dataBase = await readDataBase();
    //filters out given ID
    const filteredDB = dataBase.filter(({id}) => id != req.params.id)
    writeDataBase(filteredDB)
    res.send(`${req.params.id} deleted`);
});

export default router;