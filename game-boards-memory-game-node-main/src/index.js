import appConfigs from './config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
//require('https').globalAgent.options.ca = require('ssl-root-cas').create();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/game-boards', routes.gameBoard);
app.get('/', (req, res) => {
    console.log(file_id)
    res.send('Hello World!');
});
app.listen(appConfigs.port, () =>
    console.log(`Example app listening on port ${appConfigs.port}!`),
);