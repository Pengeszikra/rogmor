# [Rogmor](https://rogmor.vercel.app/) react + callbag stack implemented RPG
> [at first created on stackblitz](stackblitz.com/edit/rogmor)

I founded my old RPG graphic on my desktop, so my plan is create some RPG 
game on react stack, maybe PWA output, easy as possible.

[How to make a MMORPG](https://noobtuts.com/articles/how-to-make-a-mmorpg)

Question is: what is the minimal requirement for usable mobil mmorpg ?

## step of simplify:
  - 2d images
  - basic interface
  - minimal animation

[tile maps](https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps)
[tile image example](https://media.prod.mdn.mozit.cloud/attachments/2015/10/06/11697/40b391b2f58425eb78ddd0660fb8fb2e/tile_atlas.png)

## use callbag as generator function controller
I was used simple callbag to implement complex assyncron process like RPG combat calculaton, and NPC moves.
> I use pipeline operator instead callbag pip() function.

```js
  const letsFight = (a, b) => {
    interval(30) |>
    sample(fromIter(fightSaga(a, b, someOneLoose, stayInBattle))) |>
    forEach(justInc)
  };
```

```js
export function * fightSaga(a, b, fallenOne = p => p) {
  yield `\n`;
  yield `${a.name} - ${a.profession} : ${a.level} : ${a.reaction}`;
  yield 'vs.';
  yield `${b.name} - ${b.profession} : ${b.level} : ${b.reaction}`;
  yield '-'.repeat(20);
  yield `${a.reaction} : ${b.reaction}`;
  const astart = improved(a.reaction) 
  const bstart = improved(b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  yield `Attacker is: ${atk.name} ${astart} vs ${bstart}`;
  let round = 1;
  while (def.staminaState > 0 && atk.staminaState > 0 && stayInCombat(a) && stayInCombat(b)) {
    let [striker, target] = round % 2 ? [atk, def] : [def, atk];
    let dmg = improved(striker.physique / 2);
    yield `round: ${round} - ${striker.name} - strike ${dmg}`;
    round ++;
    target.staminaState -= Math.min(dmg, target.staminaState);
    yield `${target.name} ${target.stamina}/${target.staminaState}`;
  }
  yield `${atk.staminaState <= 0 ? atk.name : '' } knocked out`;
  yield `${def.staminaState <= 0 ? def.name : '' } knocked out`;
  if (a.staminaState <= 0) 
    {fallenOne(a);}
  else if (b.staminaState <= 0) 
    {fallenOne(b)}
  else 
    {fallenOne(null)};
}
```

# RPG

### character attributes

    > physique   : A karakter fizikuma az erőt és a rugallmasságot is beleértve

    > reaction   : A reakció képesség ami a reflexeket és a gyors gondolkodást is magába foglalja

    > soul       : A lelki egyensúlyt és a bölcsességet, valamint a logikus gondolkodást tükröző érték

    > liaison    : A karakter szociális és kommunikatív képessége

    > stamina    : Állóképesség és kitartás, ha az akutáli érték 0 - ra csökken akkor cselekvés képtelenné válik

    > willpower  : Akaraterő és öntudat, ha az aktuális érték 0 - ra csökken akkor elájul

    > merry      : Jókedv egyben reprezentálja a szociális energiát, álltalában nem túl lényeges a csatában, ellenben 
