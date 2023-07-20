import bcrypt from "bcrypt"

export const hashearPasword = async password => {
  if(!password) return password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}

export const compararPassword = async (password, passwordHasheado) => bcrypt.compareSync(password, passwordHasheado)