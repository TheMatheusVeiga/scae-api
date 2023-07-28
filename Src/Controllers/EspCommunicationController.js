const db = require("../Config/Database.js");
const _espServices = require('../Services/Esp.js');
const _logServices = require('../Services/Logs.js');

  //Registrar dispositivo (Único) no banco de dados. => Deve ser rodado apenas uma vez para cadastrar a unidade integrada.
  exports.registerEspDevice = async (req, res) => {
    const { deviceName } = req.body;
    const result = await _espServices.register(deviceName);
    //Socket.io Broadcasting
    global.io.emit("device_update", {status: "Evento de Registry."});
    res.status(201).send(result);
  };

  exports.syncDevice = async (req, res) => {
    const deviceId = parseInt(req.params.id);
    if (deviceId != null && deviceId != 0) {
      const result = await _espServices.getDeviceStatus(deviceId);
      (result)?res.status(200).send(result):res.status(500).send('Dispositivo sem status !');
    }
  };

  //Lista todos os dispositivos cadastrados.
  exports.getRegisteredDevices = async (req, res) => {
    const result = await _espServices.getDevices();
    res.status(200).send(result);
  };

  //Lista todas as mudanças que foram salvas no banco de dados.
  exports.getChangeLogs = async (req, res) => {
    const result = await _logServices.getDevicesChangeLogs();
    res.status(200).send(result);
  };

   //Lista todas as mudanças para um dispositivo especifico que foram salvas no banco de dados.
  exports.getChangeLogsById = async (req, res) => {
    console.log("Caiu !");
    const deviceId = parseInt(req.params.id);
    if (deviceId != null && deviceId != 0) {
      const result = await _logServices.getDeviceChangeLogById(deviceId);
      res.status(200).send(result);
    }
  }

  //Ativação de alarme com base no ultimo status da unidade integrada. => Deve verificar o ultimo status para o dispositivo informado.
  exports.activateEspDevice = async (req, res) => {
    const { deviceId } = req.body;
    const deviceCurrentStatus = await _espServices.getDeviceStatus(deviceId);

    //Socket.io Broadcasting
    global.io.emit("device_update", {status: "Evento de Activate"});

    if (deviceCurrentStatus != null) {
      if (deviceCurrentStatus === 'NONE') {
        const result = await _espServices.activateDevice(deviceId, 'ENABLED', deviceCurrentStatus);
        res.status(201).send(result);
      } else {
        const result = await _espServices.activateDevice(deviceId, 'NONE', deviceCurrentStatus);
        res.status(201).send(result);
      }
    }  
  };

  //Busca dados para montagem dos gráficos
  exports.getChartsData = async (req, res) => {
    const result = await _espServices.getChartsData();
    res.status(200).send(result);
  };