/**
 * Validation utilities for forms.
 */

/**
 * Validate Egyptian phone number format.
 */
export function isValidEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^(\+20)?01[0125][0-9]{8}$/.test(cleaned);
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength.
 * Minimum 8 characters, one uppercase, one lowercase, one number, one special char.
 */
export function isValidPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
}

/**
 * Get password validation errors.
 */
export function getPasswordErrors(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("يجب أن تحتوي على حرف صغير واحد على الأقل");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("يجب أن تحتوي على حرف كبير واحد على الأقل");
  }
  if (!/\d/.test(password)) {
    errors.push("يجب أن تحتوي على رقم واحد على الأقل");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push("يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&)");
  }
  return errors;
}

/**
 * Validate a full name (minimum 2 words).
 */
export function isValidName(name: string): boolean {
  return name.trim().split(/\s+/).length >= 2;
}
