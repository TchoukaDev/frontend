import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
  Row,
  Column,
} from "@react-email/components";

export default function ContactEmail({
  firstname,
  name,
  email,
  telephone,
  prefersPhone,
  prefersEmail,
  message,
}) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* En-tête avec gradient */}
          <Section style={styles.header}>
            <Heading style={styles.headerTitle}>
              📧 Nouveau message de contact
            </Heading>
          </Section>

          {/* Zone de contenu principale */}
          <Section style={styles.mainContent}>
            {/* Card 1: Informations du contact */}
            <Section style={styles.card}>
              <Heading as="h2" style={styles.cardTitle}>
                👤 Informations du contact
              </Heading>

              <Section style={styles.infoRow}>
                <Text style={styles.label}>Nom complet</Text>
                <Text style={styles.value}>
                  {firstname} {name}
                </Text>
              </Section>

              <Section style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <Link href={`mailto:${email}`} style={styles.link}>
                  {email}
                </Link>
              </Section>

              {telephone && (
                <Section style={styles.infoRow}>
                  <Text style={styles.label}>Téléphone</Text>
                  <Link href={`tel:${telephone}`} style={styles.link}>
                    {telephone}
                  </Link>
                </Section>
              )}
            </Section>

            {/* Card 2: Préférences de contact */}
            <Section style={styles.card}>
              <Heading as="h2" style={styles.cardTitle}>
                📞 Préférence de contact
              </Heading>

              <Row>
                <Column
                  style={{
                    ...styles.preferenceBox,
                    backgroundColor: prefersPhone ? "#d1fae5" : "#fee2e2",
                  }}
                >
                  <Text style={styles.preferenceIcon}>
                    {prefersPhone ? "✅" : "❌"}
                  </Text>
                  <Text style={styles.preferenceLabel}>Par téléphone</Text>
                </Column>

                <Column style={{ width: "20px" }} />

                <Column
                  style={{
                    ...styles.preferenceBox,
                    backgroundColor: prefersEmail ? "#d1fae5" : "#fee2e2",
                  }}
                >
                  <Text style={styles.preferenceIcon}>
                    {prefersEmail ? "✅" : "❌"}
                  </Text>
                  <Text style={styles.preferenceLabel}>Par email</Text>
                </Column>
              </Row>
            </Section>

            {/* Card 3: Message */}
            <Section style={styles.card}>
              <Heading as="h2" style={styles.cardTitle}>
                💬 Message
              </Heading>

              <Section style={styles.messageBox}>
                <Text style={styles.messageText}>{message}</Text>
              </Section>
            </Section>

            {/* Footer */}
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Ce message a été envoyé le{" "}
              <strong>
                {new Date().toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>{" "}
              depuis le formulaire de contact de votre site web.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles inline (obligatoire pour les emails)
const styles = {
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: "#f6f9fc",
    margin: 0,
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 30px",
    textAlign: "center",
  },
  headerTitle: {
    color: "#ffffff",
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "-0.5px",
  },
  mainContent: {
    padding: "30px",
    backgroundColor: "#fafbfc",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #e6e9ef",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    color: "#667eea",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "2px solid #667eea",
  },
  infoRow: {
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f0f2f5",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    margin: "0 0 4px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "16px",
    color: "#1f2937",
    margin: 0,
    fontWeight: "500",
  },
  link: {
    fontSize: "16px",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "500",
  },
  preferenceBox: {
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    border: "2px solid transparent",
  },
  preferenceIcon: {
    fontSize: "32px",
    margin: "0 0 8px 0",
    lineHeight: 1,
  },
  preferenceLabel: {
    margin: 0,
    fontWeight: "600",
    color: "#1f2937",
    fontSize: "15px",
  },
  messageBox: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderLeft: "4px solid #667eea",
    borderRadius: "6px",
  },
  messageText: {
    margin: 0,
    lineHeight: "1.7",
    color: "#374151",
    fontSize: "15px",
    whiteSpace: "pre-wrap",
  },
  hr: {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: "30px 0 20px 0",
  },
  footer: {
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "center",
    margin: 0,
    lineHeight: "1.6",
  },
};
