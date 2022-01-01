### 1-Description ###

La machine permet d'effectuer des calculs en binaire mais c'est a vous de fabriquer le programme!!
Ce petit émulateur est plus au moins fidèle à la description de turing dans son fameux papier de 1936.Elle est composée de plusieurs choses :

-On a un ruban sur lequel doivent être disposés les zéros et les uns. (Tout en bas).Il est numéroté de -10 à 10 , disposant ainsi de 21 cases pour les calculs. -On a aussi un tableau qui permet de fabriquer les programmes pour faire fonctionner la machine et ainsi écraser , modifier ou supprimer les 0 ou 1 qui sont sur le ruban.

### 2-La nomenclature du tableau et le fonctionnement de la machine ###

Dans le tableau , on dispose de checkboxs qui permettent de créer le programme.A ce stade , il est important de savoir à quoi font références les différentes colonnes et lignes.

Dans la colonne la plus à gauche du tableau : -Chaque état dispose de trois status différents.Selon ce qu'il se trouve sur le ruban (0 , 1 ou b) et l'état dans lequel se trouve la machine , c'est une des lignes de l'état concerné qui aura le controle.

b si la case rouge sur le ruban est vide (blanc) c-à-dire null en terme informatique. 0 si la case rouge sur le ruban contient un 0. 1 si la case rouge sur le ruban contient bien un 1.

Dans chaque ligne horizontal dans le tableau : On peut alors faire écraser la valeur sur le ruban grace au meme 3 sous-états : b (blanc , on efface) , on remplace la valeur en rouge sur le ruban par un blanc.(inutile si elle est déja blanche c-a-d null) 1 , on remplace la valeur en rouge du ruban par un 1 (idem inutile si c'est déja un 1 dessus) 0 , on remplace la valeur en rouge sur le ruban avec un 0.

Ensuite on peut cocher aussi g ou d qui correspondent au mouvement que devra faire la tête de lecture après avoir écrasé une valeur.g pour gauche et d pour droite.On doit en cocher uniquement une.(soit g ou d)mais on peut aussi ne rien cocher si le programme que l'on veut faire le dicte... Ensuite les cases en majuscules permettent de changer l'état global de la machine dans lequel on veut se mettre ensuite. (inutile de cocher A si notre état actuelle est A et qu'on veut pas changer d'état ect...) La case final elle , détermine la fin du programme.On doit la cocher quand on veut finir le programme.

PS : Par défaut , j'ai fixé l'état de départ à A mais il peut tout a fait être changé avant de commencer l'éxécution de notre programme) On peut choisir de faire fonctionner la machine pas-a-pas mais aussi de manière automatique.Je conseille cependant pour les premières fois le pas-a-pas pour bien comprendre l'ordre et le fonctionnement.

Pour essaie , on peut entrer ces cases qui changent les zero en 1 :

sur le ruban , on dispose des 0 et des 1 a droite de la case rouge.On clique ensuite sur les checkboxs suivantes (si on est dans l'état de départ A): Ab-d A0-1-d A1-0-d

Puis on lance la machine en pas-a-pas ou automatique.Vous devriez voir les blancs ignorés, les zéros remplacés par des 1 et les 1 remplacés par des zéros. (comme il n'y a pas détat "final" la machine continuera de progréssé mais vous pouvez appuyer sur recharger pour ré-initialiser)

