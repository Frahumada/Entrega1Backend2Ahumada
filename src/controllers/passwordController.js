import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import { sendRecoveryEmail } from '../utils/mailer.js';
import { createHash, isValidPassword } from '../utils/hash.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await UserRepository.findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const token = jwt.sign(
    { sub: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  if (!resetLink) {
    return res.status(500).json({ message: 'Error al generar el enlace de recuperación' });
  }

  await sendRecoveryEmail(email, resetLink);

  res.json({ message: 'Correo de recuperación enviado' });
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findUserById(decoded.sub);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const samePassword = isValidPassword(newPassword, user.password);
    if (samePassword) {
      return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    user.password = createHash(newPassword);
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }
};

