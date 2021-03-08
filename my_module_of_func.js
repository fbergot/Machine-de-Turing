import { v , state_start , timer , $$ , etats , tableProg} from './index.js';

/**
 * Module qui contient toutes les fonctions utilent aux fonctionnement du projet
 */
export const my_module = {
  /**
   * Function for moved the cursor
   * @param {string} ligne_i represent ligne in table
   * @param {number} teteDeLecture position of head of read
   */
  move_cursor: function (ligne_i, teteDeLecture) {
    if (ligne_i.indexOf("d") != -1) {
      v.value = Number(teteDeLecture) + 1;
      this.color(v.value, [...$$("#ruban input[type='text']")]);
    } else if (ligne_i.indexOf("g") != -1) {
      v.value = Number(teteDeLecture) - 1;
      this.color(v.value, [...$$("#ruban input[type='text']")]);
    }
  },
  /** Change the state
   * @param {string} ligne element of array qui contient les cases qui sont cochés dans la table principal ex: 'A0B'
   * @returns {void}
   */
  change_state: function (ligne) {
    for (let i = 0; i < etats.length; i++) {
      if (ligne.endsWith(etats[i]) && etats[i] !== "FINAL") {
        state_start.value = etats[i];
      } else if (ligne.endsWith(etats[i]) && etats[i] === "FINAL") {
        this.finish();
        state_start.value = "FINAL";
      }
    }
  },

  /**
   * Function when program is over (end of the timer)
   */
  finish: function () {
    window.alert("Fin du programme");
    clearInterval(timer);
  },
  /**
   * Paint checkbox when user click for programming machine
  //  *@param {HTMLelement-(input)} checkbox input type checkbox
  //  */
  color_check: function (checkbox) {
    checkbox.className === "check color_check"
      ? checkbox.classList.remove("color_check")
      : checkbox.classList.add("color_check");
  },
  /** Fonction qui gère la colorisation des cases de façon synchrone avec la marche du simulateur
   * @param {number} index index qui permet la sélection des cases pour les colorer chacunes leurs tour
   * @returns {void}
   */
  color: function (index, array) {
    // on boucle sur toutes les cases du ruban pour leur enlever la class color
    array.forEach((case_ruban) => {
      case_ruban.classList.remove("color");
    });
    // color case with good index
    const case_ruban_add_color = document.getElementById(`${index}`);
    case_ruban_add_color.classList.add("color");
  },
  analyse_ligne: function (tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture,  array) {
    if (tabCelluleRuban[index] == array[0]) {
      //instruction uniquement la ligne quand on rencontre un blanc (filtrage)
      const ligne = filterTabIdCheck.filter((el) =>
        el.startsWith(etatStart + array[0])
      );

      // on boucle sur cette ligne
      for (let i = 0; i < ligne.length; i++) {
        //faut il ecraser et réecrire une valeur sur cette case ??
        if (ligne[i].includes(array[1])) {
          console.log(ligne);
          document.getElementById(`${teteDeLecture}`).value = "";
        } else if (ligne[i].includes(array[2])) {
          document.getElementById(`${teteDeLecture}`).value = 1;
        } else if (ligne[i].includes(array[3])) {
          document.getElementById(`${teteDeLecture}`).value = 0;
        }
        // Mouvement tête de lecture
        this.move_cursor(ligne[i], teteDeLecture);
        // faut -il changer d'état?
        this.change_state(ligne[i]);
      }
    }
  },
  execute_range: function(el, array, ligne, head) {
    array.forEach((l) => {
      ligne = tableProg.insertRow(-1);
      ligne.id = el + l;
      head.forEach((c, i) => {
        ligne.insertCell().innerHTML =
          i == 0
            ? el
            : i == 1
            ? l
            : `<input class="check" type="checkbox" id= ${el + l + c}>`;
      });
    });
  },
};
