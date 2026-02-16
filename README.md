# [Rogmor](https://rogmor.vercel.app/) 
A minimal MMORPG started a long time ago:
> [initially created on stackblitz](https://stackblitz.com/edit/rogmor)

I found my old RPG graphics on my desktop, so my plan is to create an RPG 
game on the React stack, maybe with PWA output, as easy as possible.

## Recent Updates (2026-02-16)

### Security & Dependency Updates
The project has been modernized with latest dependencies and security fixes:

**Major Version Updates:**
- ✅ Next.js 14.2 → 15.5.12 (fixes DoS vulnerabilities)
- ✅ React 18.3 → 19.2.4
- ✅ TypeScript 4.7 → 5.9.3
- ✅ MongoDB driver 4.x → 6.x
- ✅ Node.js requirement: 18+ (previously 16)

**Security Improvements:**
- ✅ Removed hardcoded credentials and API keys from source code
- ✅ Added input validation to API routes (`/api/ai`, `/api/ai-image`)
- ✅ Fixed middleware authentication with proper error handling
- ✅ Migrated from deprecated `publicRuntimeConfig` to `env` variables
- ✅ **pnpm audit:** No known vulnerabilities found

**Code Quality:**
- ✅ ESLint: Switched to `@typescript-eslint` parser
- ✅ Removed Jest and Cypress test dependencies (cleanup)
- ✅ Build successfully compiles with no errors

**⚠️ Manual Steps Required:**
If you're setting up this project, make sure to:
1. Create `.env.local` file with your API keys (see `.env.local.example` if available)
2. Never commit API keys or secrets to version control
3. For production: Use Vercel Environment Variables

## AI Improvements 
In 2023, AI and ChatGPT gave me many ideas about how to improve my development process. I posted about this here:

**2026 Update:** Modernized with GitHub Copilot CLI


[Using ChatGPT for Complex Fantasy Story and Programming Creation](https://dev.to/pengeszikra/using-chatgpt-for-complex-fantasy-story-and-programming-creation-5go5)

## Next Goal:
Reworking this project to **TypeScript** and **Next.js** built with **SWC**.

This is the next iteration of my vision because it focuses on being realized as a Next.js project. Rogmor development started as a StackBlitz application, then became a React application, and now we're focusing on going into the server side.

![compact view of development](./_documents/start-moment-of-nextjs.png)
compact view of development

[How to make a MMORPG](https://noobtuts.com/articles/how-to-make-a-mmorpg)

Question: What is the minimal requirement for a usable mobile MMORPG?

## Steps to Simplify:
  - 2d images
  - basic interface
  - minimal animation

[tile maps](https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps)
[tile image example](https://media.prod.mdn.mozit.cloud/attachments/2015/10/06/11697/40b391b2f58425eb78ddd0660fb8fb2e/tile_atlas.png)

# first saga controlled fight

```js
export function * fightSaga(a, b, fallenOne = p => p) {
  yield `\n`;
  yield `${a.name} - ${a.profession} : ${a.level} : ${a.reflex}`;
  yield 'vs.';
  yield `${b.name} - ${b.profession} : ${b.level} : ${b.reflex}`;
  yield '-'.repeat(20);
  yield `${a.reflex} : ${b.reflex}`;
  const astart = improved(a.reflex) 
  const bstart = improved(b.reflex)
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

  `body` : It is physic of character including strength.

  `reflex` : It is the reflex capability including first thinking and the reflex.

  `soul` : Spiritual harmony, logical thinking and wisdom.

  `aura` : This is the character presence, social and impact to other.

  `stamina` : This is the stamina and Longevity. if value reduced to 0 then hero unable to do anything.

  `focus` : Hero mind stability. If value reduce to 0 then hero is fall down.

  `morale` : This is the fossil energy very helpful at any social interaction.


This program focus be refact to the nextjs I hope with that step I reach my goal to single typescript MMORPG focus be a reachable goal.

# Mistakes

The following mistakes I made it when I wrote this program the first one are used exports define default solutions so that each component has no name and that is terrible resident and development tool: Component.

```tsx
// ./components/NoNameComponent.tsx

export default () => (
  <pre>
    <p>Component whitout name</p>
    <p>react component devtool isn't handle well this</p>
  </pre>
);

// use

import IGaveAnotherName from './components/NoNameComponent';
```

# Database

The big question is which database is perfect for this application? 

- mongoDB - already selected mongoDB cloud one
- firebase
- [supabase](https://supabase.com/docs/reference/javascript/installing)

# system design with [arrows](https://arrows.app/#/local/id=o8r9F2OklqH_7JgWSXnt)

![arrows.app](/documents/RogmorTheNextRPG.svg)

```
MATCH path0 = (Talk)<--(NPC)-->()<--(Story)<--()<--(Hero)-->(Experience)<--(Story)<--(Skillset),
path1 = (`Level `)-->()-->(Hero)-->(Inventory)-->()-->()-->(Hero)-->(Skillset),
path2 = (NPC)-->()<--(Story)-->(Talk),
path3 = (Login)-->(Play)-->(Hero)-->(`Level `)<--(Experience),
path4 = (Story)-->()-->(Inventory),
path5 = (Login)-->()-->(Play),
path6 = (:instance)-->(Login),
path7 = ()
RETURN path0, path1, path2, path3, path4, path5, path6, path7
```
## Important deployment step of Vercel
I take few hour to solve the automatic vercel deployment from my gith repo.
On Build & Development Settings drop down you can select nextjs instead of try output library set to `.next/`

![nextjs to vercel build setup](./_documents/vercel-nextjs-buildset-as-nextjs.png)

```tsx
export function * encounterSaga() {
  const {payload:{heroTeam, opponentTeam, area, isAuto}} = yield take(ENCOUNTER_BEGIN);

  const {type} = yield take([LETS_TALK, AMBUSH, CHARGE]);

  if (type === CHARGE) {
    let sequence = speedOrder([
      chargeOrder(heroTeam),
      awarnesOrder(opponentTeam),
    ]);

    while (sequence.length) {
      const [next] = sequence;
      const nextMove = heroTeam.includes(next) 
        ? yield waitUserInteraction()   // >>  take([STRIKE, SKILL])
        : yield figureOutOppositesMove()
    }


  }

}
```

# Slash
Small script language with tailwind like syntax for simplify skill programming.
Easy compose functionality

```bash
    # simple strong strike with weapon
    target
    body-hit
    power-2

    target-all
    body-hit
    weak-2

    fill-4 # need a four round to refill
    target-2
    soul-hit-4

    fill-3
    target-ally
    soul-heal-2

    fill-2
    target-ally-all
    reflex-shield-4

    instant # this means ready for use instant
    fill-4
    target-random
    soul-hit-percent-5

    fill-6
    body-sacrifice-5
    target-ally-dead
    resurrection
    soul-heal-4
```

![Slash controlled fight](./_documents/rogmor-action-I.gif)

# TDD Test Drive Development
Under Slash development, the TDD is a great help. Step by step implement the whole action process,
maybe this code is not the optimum, but looks it is working. And TS also great help to solve this complex process.

Seems it is works fine in reality. This way the whole progress can be followed. And shows some missing feature after the first implementation of `slash` the inner script language.

## Design note by Samsung galaxy S6lite tablet

![design note by samsung s6lite tablet](./_documents/rogmor-s6-design.png) 

## first interactive auto fight capable combat process saga

```ts
export function * combatZoneSaga() {
  while (true) {
    yield take(ENCOUNTER_BEGIN);

    const {hero}:MainState = yield select();

    const pickProf = () => pickOne(Object.keys(skillForProf))

    const testTeams = yield getTeams();
    
    const combatSetupMobList = testTeams.map(
      ([lvl, type, team, avatar]:[number, ProfessionKey, Team, number]) => 
        makeMob(lvl, type, team, avatar)
    );

    yield putAction(SET_MOB_LIST, combatSetupMobList)
    let mobList = combatSetupMobList;

    _CombatIsOver_: while (true) {
      const order = actionOrder(mobList);

      while (order.length) {
        const [actor]:OrderOfSeed = order.shift();
        yield putAction(PLAY_FLOW, {who: actor.uid});
        const skillList = getSkillObject(actor);

        const {isAutoFight} = yield select();
        const subList= yield call(userChiceTheSkillSaga, skillList, actor, isAutoFight)

        _NextActor_: while (true) {
          if (subList.length < 1) break _NextActor_;

          const [, command] = yield race([
            delay(BATTLE_SPEED),
            take([HEART_BEAT, ENCOUNTER_OUTCOME]),
          ])

          if (command?.type === ENCOUNTER_OUTCOME) break _CombatIsOver_;

          const skill = subList.shift();
          const [aiTargetting, skillResult] = getSkillResult(actor, skill, mobList);
          yield putAction(PLAY_FLOW, aiTargetting);
          yield putAction(PLAY_FLOW, skillResult);
          mobList = yield call(skillReducer, mobList, skillResult);
          yield putAction(SET_MOB_LIST, mobList);

          const isTwoTeam = mobList
            .filter(isCapableToAction)
            .map(mob => mob.team)
            .find((item, _, arr) => arr.indexOf(item) !== 0)
          ;

          if(!isTwoTeam) {
            yield take([HEART_BEAT, ENCOUNTER_OUTCOME]);
            yield putAction(FOCUS_ON, null);
            break _CombatIsOver_;
          }
        }
      }
    }
    yield putAction(SET_MOB_LIST, [])
  }
}

function * userChiceTheSkillSaga(skillList:Partial<SlashObject>[][], actor:Mob, isAutoFight: boolean) {
  if (actor.team !== Team.GOOD || isAutoFight) return skillList.at(0)
  const {payload: skillIndex} = yield take([USE_SKILL, SET_AUTO_FIGHT]);
  return skillList.at(skillIndex);
}
```

## Five Times Seven

My imagine is I made whole game on gird 5 x 7, so this is fine for vertical mobile setup. With this single css attribute I can setup the size of item.

> Goal is: really fast and easy UI module in react.

```css
 .container {
   display: grid;
   grid: repeat( 7, 7em) / repeat( 5, 5em);  
 } 
 .item { gridArea: 4 / 1 / 7 / 6; }
```

# AI content creation slowly take a place

![Design Something](./_documents/rogmor-design-something.png)

Image generation with [DALL-E](https://platform.openai.com/docs/guides/images) AI api endpoints

# AI Explore the whole world, and meanwhile write down every details about places.

## chatGPT fetch

```js
const getHeader = key => new Headers({
  'Authorization': `Bearer ${key}`, 
  'Content-Type': 'application/json'
});
// get from :: https://platform.openai.com/account/api-keys
const headers = getHeader('< YOUR-API-KEY >')
const ai = seek => fetch(
  "https://api.openai.com/v1/completions",
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": seek,
      "max_tokens": 2000,
      "temperature": 1.0
    })
  }
)
  .then(res => res.json())
  .then(res => res.choices[0].text)
  .then(console.log)
  .catch(console.error)
;
```
