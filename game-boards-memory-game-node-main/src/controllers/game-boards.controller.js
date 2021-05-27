var Service = require('../services/game-boards.service')

exports.getGameSessionIdAndCardsData = async function (req, res, next) {
    try {
       var resp = await Service.getGameSessionIdAndCardsData(req.body)
        return res.status(200).json({ status: 200, data: resp, message: "Successfully Users Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}
