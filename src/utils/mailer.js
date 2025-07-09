import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRecoveryEmail = async (para, link) => {
  const mailOptions = {
    from: `FRAC Auth <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hacé clic en el botón para restablecer tu contraseña:</p>
      <a href="${link}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none;">Restablecer contraseña</a>
      <p>Este enlace expirará en 1 hora, metele pata...</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📨 Email de recuperación enviado a ${para}`);
};
