# Nrk case oppgave til intervju

## RUN
Clone repo med 'git clone https://github.com/Aelxnadre72/nrk_views.git'.<br>
Kjør 'npm start' innenfor 'nrk-views'-mappen.

## Info om webapplikasjonen
Foreløpig er det kun alternativet 'Alle' som fungerer på serie-drop down'en. Enhet-drop down'en fungerer.
Nettsiden viser alle seriene med totale seertall for hver enhet i den angitte perioden.

Eksempel: Denne filtreringen vil vise totalt antall visninger for hver serie og enhet fra 1. januar til 1. februar 2018:
serie: 'Alle', enhet: 'Alle', dato: 01/01/2018 - 01/02/2018

## NB
Koden er nokså ustrukturert siden jeg måtte brute force meg gjennom problemer underveis for å ikke bruke altfor lang tid.
Jeg endte opp med å bruke mer enn 4 timer. Håper det går fint. Jeg kunne laget en simplere løsning på kortere tid, men 
det føler jeg ikke ville gitt et godt inntrykk. Det er en del av koden i charts.tsx som er kommentert ut siden den forelpig 
ikke fungerer 100%.