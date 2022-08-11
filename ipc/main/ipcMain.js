import { ipcMain } from 'electron';
import mqttClient from '../../electron/main/mqtt.client';
// 渲染层的机台运行状态通知
ipcMain.on('machineStatus', (e, data) => {
  console.log(e);
  console.log('监听机台运行状态的topic' + data);
  mqttClient.doSubscribe(data, 1);
});

// 渲染层的花型信息，通知获德
ipcMain.on('flowerPattern', (e, data) => {
  const { topic, qos, payload } = data;
  console.log(e);
  console.log(topic, qos, payload);
  mqttClient.doPublish(topic, qos, payload);
});

// 渲染层的获取图片消息通知
ipcMain.on('getImages', (e, data) => {
  console.log(e);
  console.log('监听采样topic' + data);
  mqttClient.doSubscribe(data, 1);
});
// 渲染层的停止获取图片消息通知
ipcMain.on('getImagesEnd', (e, topic) => {
  console.log(e);
  console.log('结束监听采样topic' + topic);
  mqttClient.doUnSubscribe(topic);
});
// 渲染层的 监听ai验布返回的结果
ipcMain.on('getImageInferenceResult', (e, data) => {
  console.log(e);
  console.log('监听验布topic' + data);
  mqttClient.doSubscribe(data, 1);
});
// 渲染层的 结束监听ai验布返回的结果
ipcMain.on('getImageInferenceResultEnd', (e, topic) => {
  console.log(e);
  console.log('结束监听验布topic' + topic);
  mqttClient.doUnSubscribe(topic);
});

// 渲染层的发送修正疵点消息，通知华为
ipcMain.on('imageInferenceModify', (e, data) => {
  console.log(e);
  console.log('imageInferenceModify' + data);
  const { topic, qos, payload } = data;
  mqttClient.doPublish(topic, qos, payload);
});

/**
 * 发送消息给西德，控制机器的运行状态
 * action:
 *  up: 验布机上转
 *  down: 验布机下转
 *  auto: 自动验布
 *  warning: 机器报警
 *  stop: 停止所有动作
 *  clear: 清除计米器示数
 */
ipcMain.on('operateMachine', (e, data) => {
  console.log(e);
  console.log('operateMachine' + data);
  const { topic, qos, payload } = data;
  mqttClient.doPublish(topic, qos, payload);
});
