const db = require("../Config/Database.js");

exports.getDevicesChangeLogs = async () => {
    const {rows} = await db.query('SELECT log_id, device_id, TO_CHAR(change_date::DATE, $1) as change_date, log_from, log_to FROM esp_devices_logs ORDER BY log_id ASC', [String('dd/mm/yyy hh:mm:ss')]);
    console.log('Called getChangeLogs.');
    return rows;
}

exports.getDeviceChangeLogById = async (deviceId) => {
    const {rows} = await db.query('SELECT * FROM esp_devices_logs WHERE device_id = $1 ORDER BY log_id DESC', [parseInt(deviceId)]);
    console.log('Called getDeviceChangeLogById.');
    return rows;
}

exports.saveDeviceChangelog = async (deviceId, deviceNewStatus, deviceOldStatus) => {
    const result = db.query("INSERT INTO esp_devices_logs (device_id, change_date, log_from, log_to) VALUES ($1, NOW(), $2, $3)", [parseInt(deviceId), String(deviceOldStatus), String(deviceNewStatus)]) .catch(err => {console.log(err)});
    return result
}