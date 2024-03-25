export const getPasswordResetHtml = (token: string) => {
  return `<p>You requested a password reset. Please use the following token to reset your password:</p><p><strong>${token}</strong></p><p>If you did not request a password reset, please ignore this email.</p>`;
};
