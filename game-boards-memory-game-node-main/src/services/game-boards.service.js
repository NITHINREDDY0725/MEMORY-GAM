import axios from 'axios';
import { GAME_MODES_CARDS_MAP } from '../shared/enums';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const getGameSessionIdAndCardsData = async function (data) {
    try {
        let session_file = data.gameSessionId;
        if (!session_file) {
            session_file = `${uuidv4()}.json`;
            let sessionData = {
                gameMode: data['gameMode'],
            };

            const dataToStore = JSON.stringify(sessionData);
            fs.writeFileSync(`src/models/${session_file}`, dataToStore);
        }
        const pages = GAME_MODES_CARDS_MAP[data.gameMode];
        return axios.get(`https://api.unsplash.com/search/photos/?client_id=c0c103ae0af5122685dec516d4275b6471e81c388d2ce0791c61bb8f47285d5d&query=flower&per_page=${pages}`).then(res => {
            console.log(res.data.results)
            return { records: res.data.results, gameSessionId: `${session_file}` };
        }).catch(err => {
            console.log(err.message)
            throw new Error(err.message);
        })
        //const fileCreated= fs.writeFileSync(`src/models/${session_file}.json`)
        // const stats = fs.statSync('src/models/' + file.filename);

    } catch (error) {
        throw Error('Error while getting data')
    }
}


exports.getGameSessionIdAndCardsData = getGameSessionIdAndCardsData;