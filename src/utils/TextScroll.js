export class TextScroll {
  constructor(containerId, texteId, direction) {
    // Plus simple : un seul élément par ID
    this.container = document.getElementById(containerId);
    this.texte = document.getElementById(texteId);
    this.direction = direction;

    // Vérification simple
    if (this.container && this.texte) {
      this.startScroll();
    } else {
      console.warn(`Éléments non trouvés: ${containerId} ou ${texteId}`);
    }
  }

  startScroll() {
    const container = this.container;
    const texte = this.texte;
    const direction = this.direction;

    // Position initiale du texte selon la direction
    let pos = direction === "left" ? container.offsetWidth : -texte.offsetWidth;
    let lastTime = 0;

    function step(currentTimestamp) {
      if (!lastTime) lastTime = currentTimestamp;
      const elapsed = currentTimestamp - lastTime;

      if (elapsed >= 16) {
        // ~60 FPS
        pos += direction === "left" ? -1.5 : 1.5;

        // Réinitialisation de la position si le texte sort de l'écran
        if (direction === "left" && pos <= -texte.offsetWidth) {
          pos = container.offsetWidth;
        } else if (direction === "right" && pos >= container.offsetWidth) {
          pos = -texte.offsetWidth;
        }

        texte.style.transform = `translateX(${pos}px)`;
        lastTime = currentTimestamp;
      }

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
}
