const router = require('express-promise-router')();
const EspCommunicationController = require('../Controllers/EspCommunicationController');

router.post('/esp32/register-device', EspCommunicationController.registerEspDevice);
router.post('/esp32/activate-device', EspCommunicationController.activateEspDevice);
router.get('/esp32/sync/:id', EspCommunicationController.syncDevice);
router.get('/esp32/list-devices/', EspCommunicationController.getRegisteredDevices);
router.get('/esp32/change-logs/', EspCommunicationController.getChangeLogs);
router.get('/esp32/change-logs/:id', EspCommunicationController.getChangeLogsById);
router.get('/esp32/charts', EspCommunicationController.getChartsData);


module.exports = router;