import emailModel from "../models/emailModel.js";
import sendEmail from "../services/emailServices.js";
import errorCodes from "../utils/errorCodes.js";

const sendEmailNotification = async (recipient, subject, content) => {
  let email;
  try {
    email = await emailModel.create({
      recipient,
      subject,
      content,
    });

    await sendEmail(recipient, subject, content);

    await email.update({ status: "sent" });
  } catch (error) {
    console.error("Error sending email notification", error);
    if (email) {
      await email.update({ status: "failed" });
    }
    throw new Error(errorCodes.EMAIL_SENDING_ERROR);
  }
};

export default sendEmailNotification;
