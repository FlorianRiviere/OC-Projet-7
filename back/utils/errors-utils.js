module.exports.signUpError = (err) => {
  let error = { email: "", password: "" };
  if (err.message.includes("email")) {
    error.email = "email incorrect";
  }
  if (err.message.includes("password")) {
    error.password = "Le mot de passe n'est pas conforme";
  }
};
