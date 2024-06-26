import nodemailer, { Transporter } from 'nodemailer';

class Mailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alertify.system@gmail.com', // your Gmail email address
        pass: 'ipckcgpuomxchulh', // your Gmail password or an app-specific password
      },
    });
  }

  sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'alertify.system@gmail.com', // sender address (must be your Gmail email address)
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions,(err) => {

      if (err) {
          console.log(err);
          console.log('Error Occurs');
         throw new Error(err.message)
      } else {
          console.log(`Email sent successfully`);
      }

  });

  }
}

export default new Mailer();
