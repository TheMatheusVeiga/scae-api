const db = require("../Config/Database.js");
const _logServices = require('./Logs.js');

exports.register = async (deviceName) =>{
    const { rows } = await db.query(
        "INSERT INTO esp_devices (device_name, device_status, created_at) VALUES($1,'NONE', NOW()) RETURNING device_id",
        [deviceName]
      );

    console.log('Esp device registred !');
    return {
        message: "Dispositivo cadastrado com sucesso!",
        body: {
        device: {
          id: rows[0].device_id,
          name: deviceName
        }
      },
    };
};

exports.getDevices = async () => {
    const {rows} = await db.query('SELECT * FROM public.esp_devices ORDER BY device_id ASC');
    console.log('Called getRegisteredDevices.');
    return rows;
};

exports.getDeviceStatus = async (id) => {
    let res;
    const {rows} = await db.query('SELECT device_status FROM public.esp_devices WHERE device_id = $1', [parseInt(id)])
                    .catch(err => {console.log(err)});
    (rows[0])?res = rows[0].device_status:res = '';

    return res;
};

exports.activateDevice = async (deviceId, newStatus, oldStatus) => {
    const { rows } = await db.query(
        "UPDATE public.esp_devices SET device_status = $1 WHERE device_id = $2 RETURNING device_status", [String(newStatus), parseInt(deviceId)]
      );
      
      _logServices.saveDeviceChangelog(deviceId, newStatus, oldStatus);
      console.log('Called activateEspDevice.');

      return {
        message: "Status do dispositivo alterado!",
        body: {
          before: {
            status: oldStatus
          },
          after: {
            status: rows[0].device_status
          }
  
        },
      };
}

exports.getChartsData = async () => {
  console.log('Called getChartsData.');

  let charts = {
    dataByDevices:[],
    dataByDays: [],
    dataByStatus: [],
  };
  charts.dataByDevices = (await db.query('select device_id, COUNT("device_id") as changes from esp_devices_logs edl group by edl.device_id;')).rows;
  charts.dataByDays = (await db.query('select TO_CHAR(date_trunc($1, "change_date")::DATE, $2) as dia, COUNT("change_date") as changes from esp_devices_logs edl group by dia order by dia desc ;', [String('day'), String('dd/mm')])).rows;
  charts.dataByStatus = (await db.query('select COUNT(*) filter(where log_to = $1) as Emergencia, COUNT(*) filter(where log_to = $2) as Normais, COUNT(*) as Total from esp_devices_logs edl ;', [String("ENABLED"), String("NONE")])).rows;
  debugger
  return charts;
}