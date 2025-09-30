// Imports des composants et utilitaires nécessaires
import PdfThumbnail from "@/components/Utils/PdfThumbnail/PdfThumbnail";
import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";

export default async function SessionsPage({ data }) {
  const sessions = data;

  // Extraction des tableaux de séances et des documents PDF
  const tableaux = sessions?.tableau;
  const docs = sessions?.pdf;

  // Définition des jours de la semaine en minuscules
  // Utilisés comme base pour construire les clés des champs du tableau
  const JOURS = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  // Transformation des jours avec première lettre en majuscule pour l'affichage
  // Ex: "lundi" → "Lundi"
  const daysArray = JOURS.map(
    (jour) => jour.charAt(0).toUpperCase() + jour.slice(1),
  );

  // Construction des champs pour les deux lignes du tableau
  // daysFields[0] = ["lundi1", "mardi1", ...] (première ligne)
  // daysFields[1] = ["lundi2", "mardi2", ...] (deuxième ligne)
  const daysFields = [
    JOURS.map((jour) => `${jour}1`), // Ligne 1 : horaires du matin
    JOURS.map((jour) => `${jour}2`), // Ligne 2 : horaires de l'après-midi
  ];

  return (
    <Card>
      {/* Titre principal de la page */}
      <h1>Les horaires et sites de séances</h1>

      {/* Container principal avec espacement entre sections */}
      <div className="space-y-10">
        {/* Section 1 : Tableaux des horaires */}
        <section className="section">
          <div className="space-y-12">
            {/* Titre animé de la section */}
            <AnimatedTitle as="h2" odd>
              {sessions.titre1}
            </AnimatedTitle>

            {/* Boucle sur chaque tableau de séances */}
            {tableaux?.map((tableau) => (
              <div className="space-y-6 text-black" key={tableau.id}>
                {/* Dates de validité du tableau */}
                <p className="text-center underline prose max-w-none">
                  {tableau.dates}
                </p>

                {/* Container responsive pour le tableau */}
                <div className="w-full px-2 sm:px-4 md:px-0">
                  {/* Container avec scroll horizontal si nécessaire */}
                  <div className="overflow-x-auto">
                    {/* Tableau responsive :
       
                    */}
                    <table className="table-auto border-collapse bg-blue1 w-full md:w-[70%] mx-auto">
                      {/* En-tête du tableau avec fond gris clair */}
                      <thead className="bg-blue-50">
                        <tr>
                          {daysArray.map((day, index) => (
                            <th
                              key={index}
                              className="border border-gray-200 text-center align-middle 
                                        p-1 sm:p-2 md:p-3
                                        text-[10px] sm:text-xs md:text-sm lg:text-base
                                        font-medium text-gray-700"
                            >
                              {/* Version courte (3 lettres) sur mobile pour gagner de l'espace */}
                              <span className="block sm:hidden">
                                {day.substring(0, 3)}
                              </span>
                              {/* Version complète sur tablette et plus */}
                              <span className="hidden sm:block">{day}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      {/* Corps du tableau */}
                      <tbody>
                        {/* Boucle sur les lignes (matin/après-midi) */}
                        {daysFields.map((fields, rowIndex) => (
                          <tr key={rowIndex} className="even:bg-black/5">
                            {/* Boucle sur les colonnes (jours) */}
                            {fields.map((field, colIndex) => (
                              <td
                                key={colIndex}
                                className="text-center align-middle border border-gray-200
                                          p-1 sm:p-2 md:p-3
                                          text-[10px] sm:text-xs md:text-sm lg:text-base"
                              >
                                {/* break-words permet au texte long de passer à la ligne */}
                                <span className="block break-words">
                                  {/* Affiche la valeur ou "-" si vide */}
                                  {tableau[field] || "-"}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Commentaire optionnel sous le tableau */}
                  {tableau.commentaire && (
                    <p className="text-center font-semibold prose max-w-none mt-4 px-2 text-sm sm:text-base">
                      {tableau.commentaire}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 : Documents PDF */}
        <section className="section">
          {/* Titre animé de la section documents */}
          <AnimatedTitle as="h2">{sessions.titre2}</AnimatedTitle>

          {/* Container pour les PDF avec espacement important */}
          <div className="space-y-20">
            {/* Boucle sur chaque document PDF */}
            {docs?.map((doc) => (
              <div key={doc.id}>
                {/* Container flex centré pour titre et miniature */}
                <div className="flex flex-col justify-center items-center gap-8">
                  {/* Titre du document */}
                  <p className="prose max-w-none font-semibold text-center">
                    {doc.titre}
                  </p>

                  {/* Composant miniature PDF avec URL complète */}
                  <PdfThumbnail
                    url={`${process.env.STRAPI_API}${doc.pdf.url}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
}
