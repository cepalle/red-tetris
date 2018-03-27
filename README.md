# red-tetris (work in progress)


Au travers de l’écriture d’un jeu de Tetris en réseau, vous mettrez en oeuvre des principes fonctionnels, asynchrones client et serveur et réactifs.

Vous aurez à écrire des tests unitaires qui devront être dignes d’une chaine industrielle de contiuous delivery.
Vous découvrirez aussi les derniers outils et librairies du Full Stack Javascript en vogue comme Node.js, React.js et Redux.js.

Le projet doit être écrit totalement en Javascript et particulièrement dans sa version es2015 (ES6).

Le code client doit être écrit sans appel à "this" dans le but de vous pousser à utiliser des constructions fonctionnelles et non objet. Vous avez le choix de la librairie fonctionnelle à utiliser ou pas. La logique de manipulation du tas et des pièces doit être implémentée sous forme de "pure functions".

A l’inverse le code serveur doit utiliser de la programmation orientée prototype. Nous voulons y retrouver au minimum les classes Player, Piece et Game.

L’application client doit être construite à partir des librairies React et Redux.
Le code HTML ne doit pas utiliser d’éléments \<TABLE/>, mais doit être exclusivement construit à partir d’un layout flexbox.

TODO:
- add settings party
- add test
