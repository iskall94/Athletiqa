export function mapNotificationToDisplay(notif) {
  const title = notif.Title || notif.title;
  const message = notif.Message || notif.message;
  const variables = message ? message.split("|") : [];
  
	let tempText = "Du har fått en ny avisering.";

  // Temporary hardcoded translation logic matching backend keys
  switch (title) {
    case "NOTIF_DONATION_RECEIVED":
      tempText = `Ny donation! ${variables[0]} har skänkt ${variables[1]} kr till din kampanj.`;
      break;
    case "NOTIF_COMMENT_RECEIVED":
      tempText = `${variables[0]} kommenterade ditt inlägg.`;
      break;
    case "NOTIF_LIKE_RECEIVED":
      tempText = `${variables[0]} gillar ditt inlägg.`;
      break;
  }

  return {
    id: notif.id,
    type: notif.type,
    targetUrl: notif.targetUrl,
    displayText: tempText,
    isRead: notif.isRead,
    createdAt: notif.createdAt
  };
}