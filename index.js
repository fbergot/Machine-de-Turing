// IMPORT5
import {my_module} from './my_module_of_func.js';
// utilitary
const $ = (id) => document.querySelector(id);
export const $$ = (id) => document.querySelectorAll(id);
//
export const tableProg = $("#table-prog");
const ruban = $("#ruban");
export let state_start = $("#etat");
//state possible in machine
export const etats = ["A", "B", "C", "D" , "FINAL"];
const ecriture = ["b", "0", "1"];
const directions = ["g", "d"];
const head = ["état" ,"statut", ...ecriture, ...directions, ...etats];
const dataRuban = Array(21).fill(0);
//init state 'A' in beginning
state_start.value = 'A';
const playButton = $("#play").addEventListener("click", turing);
const positionTeteLecture = $("#positionLect");
export const v = $("#positionLect");
const autoPlay = $("#auto").addEventListener("click", () => {
  timer = setInterval(turing, 2000);
});
const reload_button = $("#re_start").addEventListener("click", () =>
  window.location.assign("index.html"));
// make table et ribbon----
let ligne = tableProg.insertRow(0);
let headRuban = ruban.insertRow(0);
let titreRub = ruban.insertRow(1);
export let timer;

head.forEach((el) => (ligne.insertCell().innerHTML = el));
[...etats].forEach((el) => {
 if(el !== "FINAL"){
   my_module.execute_range(el, [...ecriture], ligne, head);    
  }
});

// create ribbon
dataRuban.forEach(
  (el, index) =>
    (headRuban.insertCell().innerHTML = `<input type='text' id=${index - 10}  size=1>`));
//re...
dataRuban.forEach(
  (el, index) => (titreRub.insertCell().innerHTML = `  ${index - 10}`)
);
//init color in beginning
my_module.color(positionTeteLecture.value, [...$$("#ruban input[type='text']")]);
//------------------------------------/ Master function /--------------------------------------
function turing() {
  // on récupère les infos des inputs etat de départ et position de tete de lecture
  let teteDeLecture = positionTeteLecture.value;
  let etatStart = state_start.value;

  // on récupères toutes les checkbox qui sont dans l'état checked et on en fait un array/
  let tab = [...$$("#table-prog input[type='checkbox']")];
  const tabIdCheck = [];
  tab.forEach((el) => {
    el.checked ? tabIdCheck.push(el.id) : null;
  });
  //
  // making array with input ribbon
  let tab2 = [...$$("#ruban input[type='text']")];

  const tabCelluleRuban = [];
  tab2.forEach((element, index) => {
    let cel = element.value ? `${element.value}` : "b";
    tabCelluleRuban.push(cel);
  });
  // filter the checkboxes results that are checked which correspond to the starting state
  let filterTabIdCheck = tabIdCheck.filter((el) => el.startsWith(etatStart));
  var index = 10 + Number(teteDeLecture);

  // analyse ligne 
  my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["b", "bb", "1", "0"]);
  my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["0", "0b", "01", "00"]);
  my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["1", "1b", "11", "10"]);
}

[...$$("#table-prog input[type='checkbox']")].forEach((checkbox) => {
  checkbox.addEventListener("click", () => my_module.color_check(checkbox));
});

