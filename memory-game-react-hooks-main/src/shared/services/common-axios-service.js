import { AxiosInstance } from './axios-instance';
class CommonAxiosService {
    axiosPostCall = async (urlEndPoint, data, config) => {
        return await AxiosInstance.post(urlEndPoint, data, config)
            .then(res => {
                return res.data;
            }).catch(err => {
                throw new Error(err.message);
            })
    }

    axiosDummyDataCall =async (urlEndPoint, config) => {
        return AxiosInstance.get(
            urlEndPoint
        ).then(res => {
            return res.data;
        }).catch(err => {
            throw new Error(err.message);
        })
    }
}

export default CommonAxiosService;