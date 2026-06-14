import * as signalR from "@microsoft/signalr";

const API_BASE = import.meta.env.VITE_API_URL || '';

let notificationConnection = null;

export function getNotificationConnection() {
  if (!notificationConnection) {
    notificationConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/hubs/notification`, {
        withCredentials: true, 
      })
      .withAutomaticReconnect()
      .build();
  }
  return notificationConnection;
}

export async function startNotificationConnection() {
  const connection = getNotificationConnection();
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    await connection.start();
  }
  return connection;
}

export function onReceiveNotification(callback) {
  const connection = getNotificationConnection();
  connection.on("ReceiveNotification", callback);
}

export function offReceiveNotification(callback) {
  const connection = getNotificationConnection();
  connection.off("ReceiveNotification", callback);
}