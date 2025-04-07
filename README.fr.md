# Jeu du pendu

English version here : [README.md](./README.md).

Bienvenue dans mon premier projet GitHub : un jeu de pendu, un jeu classique de devinettes de mots réalisé avec **HTML**, **CSS** et **JavaScript**.

Ce projet m'a permis de mettre en pratique mes compétences des fondamentamentaux du développement web et de gagner de l'expérience dans l'utilisation des API, les mises à jour dynamiques du contenu et la logique de base du jeu.

## Fonctionnalités

- **Support multilingue** : Disponible en anglais, français, italien, allemand et espagnol. L'utilisateur peut facilement passer d'une langue à l'autre grâce à un sélecteur de langue.
- **Génération de mots aléatoires** : Les mots sont récupérés à partir d'une API externe à chaque partie. En cas d'échec de l'API, des mots de secours sont utilisés.
- **Étapes du pendu** : Représentation visuelle du jeu du pendu, chaque mauvaise réponse ajoute une partie au dessin.
- **Design simple et responsive** : Le jeu fonctionne parfaitement sur tous les appareils avec une interface mobile-friendly.

## Technologies utilisées

- **HTML5** : Utilisé pour structurer le contenu et créer la mise en page de base du jeu.
- **CSS3** : Utilisé pour le style, la représentation visuelle du jeu et ses éléments interactifs.
- **JavaScript** : Gère la logique du jeu, telle que la récupération des mots aléatoires, la validation des entrées de l'utilisateur et le suivi de la progression du jeu (réponses correctes / incorrectes).
- **Intégration d'API** : Utilisation d'une API externe pour générer des mots aléatoires, avec des mots de secours si l'API échoue.

## Comment jouer

- **Devinez le mot** : Tapez une lettre et appuyez sur Entrée ou cliquez sur Soumettre pour faire votre proposition.
- **Réponses correctes** : La lettre correcte apparaîtra dans le mot.
- **Réponses incorrectes** : Chaque mauvaise réponse ajoute une partie au dessin du pendu.
- **Gagner** : Vous gagnez si vous devinez le mot entier avant d'avoir atteint le nombre maximum d'erreurs.
- **Perdre** : Si vous faites trop de mauvaises réponses, vous perdez la partie.

## Démarrer localement

Pour jouer au jeu localement :

1. Clonez ce dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/yourusername/hangman-game.git
    ```

2. Ouvrez le fichier `index.html` dans votre navigateur.

## Contribuer

Il s'agit d'un projet personnel créé dans le cadre de mon parcours d'apprentissage. Cependant, je suis ouverte à toute suggestion, retour ou amélioration ! N'hésitez pas à soulever un problème ou à soumettre une pull request.

## Améliorations futures potentielles

- Ajouter un tableau de scores pour suivre plusieurs parties.
- Améliorer la gestion des erreurs avec des messages plus détaillés pour les échecs d'API.
- Ajouter un chronomètre pour rendre le jeu plus compétitif.
- Améliorer le style avec des animations pour les transitions entre les états.
