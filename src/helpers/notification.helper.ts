import { notification } from "ant-design-vue";

/**
 * @description Method to create a notification alert
 * @param {Number} num 1 Succesful | 0 Error
 * @param {String} message  Message to show
 * @param {Number} duration Duration in second
 * @param {String} description  description to show
 */
const MessageNotification = (num: number, message: string, duration:number=1,description='') => {
  notification.config({
    duration: duration,
    
  });

  switch(num){
    case 1:
      notification["success"]({
        message: message,
      });
    break
    case 0:
      notification["error"]({
        message: message,
        description:description
      });
    break

    default:
      notification["error"]({
        message: message,
      });
  }
};

export default MessageNotification;
