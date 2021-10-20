import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicFolderRootObj = {root: path.join(__dirname, '../public')}

const router = express.Router()

router.get('/', function(req, res){
    res.sendFile('index.html', publicFolderRootObj);
  }); 

router.get('/notes', function(req, res){
    res.sendFile('notes.html', publicFolderRootObj);
  }); 

export default router