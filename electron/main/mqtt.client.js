import MqttClient from 'mqtt';
import bridge from '../bridge';
import { mainWindow } from './index';
// const scale = 'q10'; // 图片压缩比
const minioBaseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://minio.download.textile-saas.huansi.net`
    : `http://172.16.10.124:9000/`;
let client = null;

const initClient = async () => {
  let connectUrl = '';
  let ops = {};
  const res = await bridge.appUtils.readConfig();
  connectUrl = JSON.parse(res).mqtt;
  ops = {
    username: JSON.parse(res).username,
    password: JSON.parse(res).password,
  };
  client = MqttClient.connect(connectUrl, ops);
  client.on('connect', function () {
    console.log('服务器连接成功了');
  });
  client.on('message', (topic, message) => {
    console.log('topic');

    if (topic === `image_upload/${JSON.parse(res).machineNo}`) {
      const obj = JSON.parse(message.toString());
      obj.imageList.forEach((item) => {
        item.fileUrl = `${minioBaseUrl}/${item.bucketName}/${item.imageNameThumb}`;
        item.location = obj.location;
      });
      obj.location = parseInt(obj.location);
      mainWindow.webContents.send('imageMessage', obj);
    }
    if (topic === `image_inference_result/${JSON.parse(res).machineNo}`) {
      mainWindow.webContents.send('imageInferenceResultMessage', JSON.parse(message.toString()));
    }
    if (topic === `action_upload/${JSON.parse(res).machineNo}`) {
      mainWindow.webContents.send('actionUploadMessage', JSON.parse(message.toString()));
    }
    if (topic === `timer_location/${JSON.parse(res).machineNo}`) {
      mainWindow.webContents.send('timerLocationMessage', JSON.parse(message.toString()));
    }
    console.log(`Received message ${message} from topic ${topic}`);
  });
};
const doSubscribe = (topic, qos) => {
  client.subscribe(topic, qos, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error);
      return;
    }
    console.log('Subscribe to topics res', res);
  });
};
// 取消订阅
const doUnSubscribe = (topic) => {
  client.unsubscribe(topic, (error) => {
    if (error) {
      console.log('Unsubscribe error', error);
    }
  });
};
// 消息发布
const doPublish = (topic, qos, payload) => {
  client.publish(topic, payload, qos, (error) => {
    if (error) {
      console.log('Publish error', error);
    } else {
      console.log('Publish success', payload);
    }
  });
};
// 断开连接
const destroyConnection = () => {
  if (client.connected) {
    try {
      client.end();
      console.log('Successfully disconnected!');
    } catch (error) {
      console.log('Disconnect failed', error.toString());
    }
  }
};

export default {
  client,
  initClient,
  doSubscribe,
  doUnSubscribe,
  doPublish,
  destroyConnection,
};
