export const strapiClient = {
  // Enregister un nouvel utilisateur dans Strapi
  async register(userData) {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.email, //identifiant unique Strapi
          email: userData.email,
          password: userData.password,
          // champs personnalisés
          firstname: userData.firstname,
          name: userData.name,
          telephone: userData.telephone,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw {
        message: data.error?.message,
        details: data.error?.details,
      };
    }

    return data || {};
  },

  // Vérifier si l'email
  async emailExists(email) {
    const response = await fetch(
      `${
        process.env.STRAPI_API_URL
      }/api/users?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      },
    );
    const users = await response.json();

    return users.length > 0;
  },

  /**
   * Vérifier si un téléphone existe déjà
   */
  async phoneExists(telephone) {
    const response = await fetch(
      `${
        process.env.STRAPI_API_URL
      }/api/users?filters[telephone][$eq]=${encodeURIComponent(telephone)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      },
    );

    const users = await response.json();
    return users.length > 0;
  },
};
