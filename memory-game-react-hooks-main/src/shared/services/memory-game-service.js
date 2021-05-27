import CommonAxiosService from './common-axios-service';

export class MemoryGameService extends CommonAxiosService {
    getURLWithMainEndPoint(childUrl) {
        return '/game-boards/' + childUrl;
    }
    async getGameSessionIdAndCardsData(data,config) {        
        return await this.axiosPostCall(this.getURLWithMainEndPoint('getGameSessionIdAndCardsData'), data, config);
    }

    async getGameSessionIdAndColorCodes(data,config) {
        return await this.axiosPostCall(this.getURLWithMainEndPoint('getGameSessionIdAndColorCodes'), data, config);
    }
}