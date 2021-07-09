# nez_painel
Script para fivem: Painel acessível para administração.

Framework: VRPeX

Criei esse script especialmente para um amigo meu que é STAFF de um servidor de RP, porém possui uma limitação física que debilita os movimentos dos braços e das mãos dele e dificulta muito o trabalho dele na hora de utilizar os comandos básicos para um STAFF. Ele consegue mover o mouse e utilizar alguns botões do teclado, porém com bastante dificuldade. Ele depende muito do teclado virtual do Windows para conseguir fazer as coisas que requerem digitação.

Pensando nisso, desenvolvi um painel simples com comandos clicáveis e um teclado virtual próprio para facilitar o trabalho dele como STAFF.

Por ser uma questão de acessibilidade, estou disponibilizando o sistema gratuitamente e com o código aberto na esperança de que possa ajudar outras pessoas que tenham dificuldades parecidas com a dele ou até mesmo influenciar a comunidade a pensar nessas pessoas quando forem desenvolver seus scripts. Poranto, peço encarecidamente que não vendam esse script.

Para fazer alterações:

O script está com o código todo aberto, portanto é possível adicionar, alterar e remover qualquer elemento constante nele.

É bem simples, basta fazer alterações na whitelist de comandos que fica no arquivo 'config.lua' e em seguida alterar também no arquivo 'nui/index.html'.

As funções onclick no index.html estão definidas da seguinte forma:
- comandoSimples('[COMANDO]') -- Comandos simples que não requerem argumentos. Ex.: /nc, /fix, /tpway;
- abrirCaixaArg('[COMANDO]') -- Comandos que requerem até 1 argumento. Ex.: /car (carro), /arma (nome da arma), /god (ID);
- abrirCaixaComplexo('[COMANDO]') -- Comandos que requerem até 2 argumentos. Ex.: /group (ID) (grupo), /item (nome do item) (quantidade).

Tendo isso, é só seguir os exemplos já existentes que não tem erro.

Em futuras versões, pretendo adicionar um sistema para comandos com mais do que 2 argumentos.

Imagem:

https://i.imgur.com/wys9yLR.png
