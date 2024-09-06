export const formatError = (text: string) => {
  let formatedText = "";
  switch (true) {
    case text.includes("auth/email-already-exists"):
      formatedText =
        "The provided email is already in use by an existing user.";
      break;
    case text.includes("auth/id-token-expired"):
      formatedText = "Token expired";
      break;
    case text.includes("auth/invalid-credential"):
      formatedText = "Password or email is incorrect";
      break;
    case text.includes("auth/invalid-email"):
      formatedText = "The email address is improperly formatted";
      break;
    case text.includes("auth/invalid-id-token"):
      formatedText = "Invalid Token";
      break;
    case text.includes("auth/invalid-password"):
      formatedText = "Invalid password. It must be at least six characters.";
      break;
    case text.includes("auth/too-many-requests"):
      formatedText = "The number of requests exceeds the maximum allowed.";
      break;
    default:
      formatedText = text;
  }
  return formatedText;
};
