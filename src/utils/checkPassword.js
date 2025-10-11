export const checkPassword = (password) => {
  let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  /*
  ^                      Début de la chaîne
(?=.*[A-Z])           Au moins une majuscule (A-Z)
(?=.*[a-z])           Au moins une minuscule (a-z)
(?=.*[0-9])           Au moins un chiffre (0-9)
(?=.*[^A-Za-z0-9])    Au moins un caractère spécial (!@#$%^&*...)
.{8,}                 Au moins 8 caractères au total
$                      Fin de la chaîne
*/

  if (!regex.test(password)) {
    return false;
  }
  return true;
};
