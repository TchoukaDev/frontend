const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN =
  "26dd5798363b0598e40d9237b95adc0c533b28d07079b48f9b8e069f01bb42e5fa9a308000626c19e33c68217c6e7168c9d5c4c07f0ce1f26a8b7b7ce59d4ef434046188303ef044d926caf30818a0430268f62738e10a4dae02f0220e1a680e23931f457e1cd6e5e41a26a4c149febd96d36ccbb86f7825551e879000fb4707";

async function testConfiguration() {
  console.log("🧪 Test de la configuration Strapi\n");
  console.log("URL:", STRAPI_URL);
  console.log("Token:", STRAPI_API_TOKEN ? "✓ Défini" : "✗ Manquant");
  console.log("");

  // Test 1 : Inscription (public)
  console.log("1️⃣ Test inscription (endpoint public)");
  try {
    const testEmail = `test-${Date.now()}@test.com`;
    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: testEmail,
        email: testEmail,
        password: "Test123456!",
      }),
    });

    if (response.ok) {
      console.log("   ✅ Inscription fonctionne");
      const data = await response.json();
      console.log("   User créé:", data.user.email);
    } else {
      const error = await response.json();
      console.log("   ⚠️  Erreur:", error.error?.message);
    }
  } catch (error) {
    console.log("   ❌ Erreur:", error.message);
  }

  console.log("");

  // Test 2 : Lecture users avec token
  console.log("2️⃣ Test lecture /api/users (avec token API)");
  try {
    const response = await fetch(`${STRAPI_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    console.log("   Statut:", response.status);

    if (response.ok) {
      const users = await response.json();
      console.log("   ✅ Token API fonctionne");
      console.log("   Nombre d'utilisateurs:", users.length);
    } else {
      const error = await response.json();
      console.log("   ❌ Token invalide ou permissions manquantes");
      console.log("   Erreur:", error.error?.message);
    }
  } catch (error) {
    console.log("   ❌ Erreur:", error.message);
  }

  console.log("");

  // Test 3 : Lecture users SANS token (doit échouer)
  console.log("3️⃣ Test lecture /api/users SANS token (doit échouer)");
  try {
    const response = await fetch(`${STRAPI_URL}/api/users`);

    if (response.ok) {
      console.log(
        "   ⚠️  ATTENTION : /api/users est accessible publiquement !",
      );
    } else {
      console.log("   ✅ Bien protégé (403 Forbidden)");
    }
  } catch (error) {
    console.log("   ❌ Erreur:", error.message);
  }

  console.log("\n✅ Tests terminés");
}

testConfiguration();
