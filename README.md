# Bleu

On peut maintenant créer un compte avec la page Register
Ajout d'une base de donnée MySql
Modification du design de la page Register
Ajoute d'une vérification d'email
Taille minimum du nom ( 4 caractères )
Taille maximum du nom ( 16 caractères )
Taille minium du mot de passe ( 8 caractères )
Ajoute d'une vérification de mot de passe ( doit contenir une majuscule, un nombre et un caractère spécial )
Il ne peut plus avoir deux comptes avec une même Email
Il ne peut avoir que trois personnes avec le même Nom
Ajout d'un rate limit ( 100 requêtes toutes les 5 minutes )
Les comptes on maintenant un token d'authentification et une ID