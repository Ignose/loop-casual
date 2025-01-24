import {
  adv1,
  changeMcd,
  cliExecute,
  initiativeModifier,
  Item,
  myClass,
  myLevel,
  myTurncount,
  numericModifier,
  runChoice,
  toUrl,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $effect,
  $effects,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $monsters,
  $skill,
  AutumnAton,
  ensureEffect,
  get,
  have,
  Macro,
} from "libram";
import { Priority, Quest, Task } from "../engine/task";
import { CombatStrategy } from "../engine/combat";
import { OutfitSpec, step } from "grimoire-kolmafia";
import { atLevel, haveLoathingIdolMicrophone } from "../lib";
import { ensureWithMPSwaps, fillHp } from "../engine/moods";
import { tryPlayApriling } from "../engine/resources";
import { Priorities } from "../engine/priority";

function tuneCape(): void {
  if (
    have($item`unwrapped knock-off retro superhero cape`) &&
    (get("retroCapeSuperhero") !== "vampire" || get("retroCapeWashingInstructions") !== "kill")
  ) {
    cliExecute("retrocape vampire kill");
  }
}

function tryCape(sword: Item, ...rest: Item[]) {
  if (have($item`unwrapped knock-off retro superhero cape`)) {
    rest.unshift($item`unwrapped knock-off retro superhero cape`);
    rest.unshift(sword);
  }
  return rest;
}

function farmingNookWithAutumnaton() {
  /*  If we have fallbot, we want to start the Nook ASAP, but we also don't want to finish it
      until we've completed all of the other quests so we don't waste any evil eyes.

      This function returns true if the nook is available to farm and we still have other quests to complete.
  */
  return (
    get("hasAutumnaton") &&
    get("cyrptNookEvilness") < 50 &&
    !(
      step("questL02Larva") === 999 &&
      step("questL03Rat") === 999 &&
      step("questL04Bat") === 999 &&
      step("questL05Goblin") === 999 &&
      step("questL06Friar") === 999 &&
      get("cyrptAlcoveEvilness") === 0 &&
      get("cyrptCrannyEvilness") === 0 &&
      get("cyrptNicheEvilness") === 0 &&
      step("questL08Trapper") === 999 &&
      step("questL09Topping") === 999 &&
      step("questL10Garbage") === 999 &&
      step("questL11MacGuffin") === 999 &&
      step("questL12War") === 999
    )
  );
}

const slay_macro = new Macro()
  .trySkill($skill`Slay the Dead`)
  .attack()
  .repeat();

const Alcove: Task[] = [
  {
    name: "Alcove",
    after: ["Start"],
    prepare: (): void => {
      tuneCape();
      // Potions to be used if cheap
      if (have($item`ear candle`) && initiativeModifier() < 850)
        ensureEffect($effect`Clear Ears, Can't Lose`);
      if (have($item`panty raider camouflage`) && initiativeModifier() < 850)
        ensureEffect($effect`Hiding in Plain Sight`);
      if (have($item`Freddie's blessing of Mercury`) && initiativeModifier() < 850)
        ensureEffect($effect`You're High as a Crow, Marty`);

      if (haveLoathingIdolMicrophone()) ensureEffect($effect`Poppy Performance`);
      if (have($item`old bronzer`)) ensureEffect($effect`Sepia Tan`);
      if (have($item`ant agonist`)) ensureEffect($effect`All Fired Up`);
      if (have($item`Angry Farmer candy`)) ensureEffect($effect`Sugar Rush`);

      if (numericModifier("Initiative") < 850 && have($skill`Silent Hunter`)) {
        if (myClass() === $class`Seal Clubber`) ensureWithMPSwaps($effects`Silent Hunting`);
        else ensureWithMPSwaps($effects`Nearly Silent Hunting`);
      }
      tryPlayApriling("-combat");

      if (
        have($item`designer sweatpants`) &&
        get("sweat", 0) >= 90 &&
        numericModifier("Initiative") < 850
      ) {
        // Use visit URL to avoid needing to equip the pants
        visitUrl("runskillz.php?action=Skillz&whichskill=7419&targetplayer=0&pwd&quantity=1");
      }
    },
    acquire: [
      { item: $item`gravy boat` },
      // Init boosters
      { item: $item`ear candle`, price: 2000, optional: true },
      { item: $item`panty raider camouflage`, price: 2000, optional: true },
      { item: $item`Freddie's blessing of Mercury`, price: 2000, optional: true },
    ],
    completed: () => get("cyrptAlcoveEvilness") <= 13,
    do: $location`The Defiled Alcove`,
    outfit: (): OutfitSpec => {
      return {
        equip: tryCape($item`costume sword`, $item`gravy boat`),
        modifier: "init 850max, sword",
        familiar: $familiar`Oily Woim`,
        modes: {
          backupcamera: "init",
          parka: "pterodactyl",
        },
      };
    },
    orbtargets: () => [],
    choices: { 153: 4 },
    combat: new CombatStrategy().macro(slay_macro).kill(),
    limit: { turns: 37 },
  },
  {
    name: "Alcove Boss",
    after: ["Alcove"],
    completed: () => get("cyrptAlcoveEvilness") === 0,
    do: $location`The Defiled Alcove`,
    boss: true,
    combat: new CombatStrategy().kill(),
    limit: { tries: 1 },
  },
];

const Cranny: Task[] = [
  {
    name: "Cranny",
    after: ["Start"],
    prepare: () => {
      tuneCape();
      changeMcd(10);
      fillHp();
      tryPlayApriling("-combat");
    },
    acquire: [{ item: $item`gravy boat` }],
    completed: () => get("cyrptCrannyEvilness") <= 13,
    do: $location`The Defiled Cranny`,
    outfit: (): OutfitSpec => {
      return {
        equip: tryCape($item`serpentine sword`, $item`gravy boat`),
        modifier: "-combat, ML, sword",
        modes: { umbrella: "cocoon" },
      };
    },
    choices: { 523: 4 },
    combat: new CombatStrategy()
      .macro(
        new Macro()
          .trySkill($skill`Slay the Dead`)
          .skill($skill`Saucegeyser`)
          .repeat(),
        $monsters`swarm of ghuol whelps, big swarm of ghuol whelps, giant swarm of ghuol whelps, huge ghuol`
      )
      .macro(slay_macro),
    limit: { turns: 37 },
  },
  {
    name: "Cranny Boss",
    after: ["Cranny"],
    completed: () => get("cyrptCrannyEvilness") === 0,
    do: $location`The Defiled Cranny`,
    boss: true,
    combat: new CombatStrategy().killHard(),
    limit: { tries: 1 },
  },
];

const Niche: Task[] = [
  {
    name: "Niche",
    after: ["Start"],
    prepare: tuneCape,
    acquire: [{ item: $item`gravy boat` }],
    completed: () => get("cyrptNicheEvilness") <= 13,
    priority: () => {
      if (have($familiar`Patriotic Eagle`)) {
        if (!have($effect`Everything Looks Red, White and Blue`))
          return { score: 8, reason: "Launch RWB" };
        if (get("rwbMonsterCount") > 1 || get("cyrptNicheEvilness") <= 16)
          return { score: 0.1, reason: "Kill RWB monster" };
        if (have($effect`Everything Looks Red, White and Blue`))
          return { score: -80, reason: "Wait to launch RWB" };
      }
      return Priorities.None;
    },
    do: $location`The Defiled Niche`,
    choices: { 157: 4 },
    outfit: (): OutfitSpec => {
      const result = { equip: tryCape($item`antique machete`, $item`gravy boat`) } as OutfitSpec;
      if (get("rwbMonsterCount") !== 0) {
        result.avoid = $items`miniature crystal ball`;
      }
      if (get("rwbMonsterCount") <= 1) {
        // Cast it the first time, or maintain it
        result.familiar = $familiar`Patriotic Eagle`;
      }
      return result;
    },
    combat: new CombatStrategy()
      .macro(() => {
        if (get("rwbMonsterCount") <= 1 && get("cyrptNicheEvilness") > 16)
          return Macro.trySkill($skill`%fn, fire a Red, White and Blue Blast`);
        return new Macro();
      }, $monster`dirty old lihc`)
      .macro(slay_macro, $monsters`dirty old lihc, basic lihc, senile lihc, slick lihc`)
      .kill($monster`dirty old lihc`)
      .banish($monsters`basic lihc, senile lihc, slick lihc`),
    // Don't persist banishes while we are eagle repeating
    ignore_banishes: () => have($familiar`Patriotic Eagle`) && myTurncount() < 200,
    orbtargets: () => {
      if (get("rwbMonsterCount") === 0) return [$monster`dirty old lihc`];
      else return undefined;
    },
    map_the_monster: () => {
      if (get("rwbMonsterCount") === 0 && have($familiar`Patriotic Eagle`))
        return $monster`dirty old lihc`;
      else return $monster`none`;
    },
    limit: { turns: 37 },
  },
  {
    name: "Niche Boss",
    after: ["Niche"],
    completed: () => get("cyrptNicheEvilness") === 0,
    do: $location`The Defiled Niche`,
    boss: true,
    combat: new CombatStrategy().kill(),
    limit: { tries: 1 },
  },
];

const Nook: Task[] = [
  {
    name: "Nook",
    after: ["Start"],
    priority: (): Priority => {
      if (AutumnAton.have()) {
        if ($location`The Defiled Nook`.turnsSpent === 0) return Priorities.GoodAutumnaton;
      }
      return Priorities.None;
    },
    prepare: tuneCape,
    acquire: [{ item: $item`gravy boat` }],
    completed: () => get("cyrptNookEvilness") <= 13,
    do: $location`The Defiled Nook`,
    post: (): void => {
      while (have($item`evil eye`) && get("cyrptNookEvilness") > 25) cliExecute("use * evil eye");
    },
    outfit: (): OutfitSpec => {
      if (
        have($item`industrial fire extinguisher`) &&
        get("_fireExtinguisherCharge") >= 20 &&
        !get("fireExtinguisherCyrptUsed")
      )
        return {
          equip: $items`gravy boat, industrial fire extinguisher`,
          modifier: "item 500max",
        };
      else
        return {
          equip: tryCape($item`antique machete`, $item`gravy boat`, $item`deft pirate hook`),
          modifier: "item 500max",
        };
    },
    choices: { 155: 5, 1429: 1 },
    orbtargets: () => {
      if (AutumnAton.have() && myTurncount() < 400) return []; // ignore orb early on
      else return $monsters`spiny skelelton, toothy sklelton`;
    },
    combat: new CombatStrategy()
      .macro(
        () =>
          Macro.externalIf(
            get("lastCopyableMonster") === $monster`spiny skelelton`,
            Macro.trySkill($skill`Feel Nostalgic`)
          ),
        $monster`toothy sklelton`
      )
      .macro(
        () =>
          Macro.externalIf(
            get("lastCopyableMonster") === $monster`toothy sklelton`,
            Macro.trySkill($skill`Feel Nostalgic`)
          ),
        $monster`spiny skelelton`
      )
      .macro(slay_macro, $monsters`spiny skelelton, toothy sklelton`)
      .kill($monsters`spiny skelelton, toothy sklelton`)
      .macro(
        new Macro().trySkill($skill`Fire Extinguisher: Zone Specific`),
        $monster`party skelteon`
      )
      .banish($monster`party skelteon`),
    // Don't persist banishes when just here for autumnaton
    ignore_banishes: () => AutumnAton.have() && myTurncount() < 100,
    limit: { tries: 3 },
  },
  {
    name: "Nook Eye", // In case we get eyes from outside sources (Nostalgia)
    after: ["Start"],
    ready: () => have($item`evil eye`),
    completed: () => get("cyrptNookEvilness") <= 13,
    do: (): void => {
      cliExecute("use * evil eye");
    },
    freeaction: true,
    limit: { tries: 9 },
  },
  {
    name: "Nook Boss",
    after: ["Nook", "Nook Eye", "Nook Simple"],
    ready: () => !farmingNookWithAutumnaton(),
    completed: () => get("cyrptNookEvilness") === 0,
    do: $location`The Defiled Nook`,
    boss: true,
    combat: new CombatStrategy().kill(),
    limit: { tries: 1 },
  },
];

export const CryptQuest: Quest = {
  name: "Crypt",
  tasks: [
    {
      name: "Start",
      after: [],
      ready: () => atLevel(7),
      completed: () => step("questL07Cyrptic") !== -1,
      do: () => visitUrl("council.php"),
      limit: { tries: 1 },
      priority: () => Priorities.Free,
      freeaction: true,
    },
    ...Alcove,
    ...Cranny,
    ...Niche,
    ...Nook,
    {
      name: "Bonerdagon",
      after: ["Start", "Alcove Boss", "Cranny Boss", "Niche Boss", "Nook Boss"],
      completed: () => step("questL07Cyrptic") >= 1,
      do: () => {
        adv1($location`Haert of the Cyrpt`, -1, "");
        if (get("lastEncounter") !== "The Bonerdagon")
          visitUrl(toUrl($location`The Defiled Cranny`));
      },
      choices: { 527: 1 },
      combat: new CombatStrategy().killHard(),
      boss: true,
      limit: { tries: 2 },
    },
    {
      name: "Finish",
      after: ["Start", "Bonerdagon"],
      priority: () => Priorities.Free,
      completed: () => step("questL07Cyrptic") === 999,
      do: () => visitUrl("council.php"),
      limit: { tries: 1 },
      freeaction: true,
    },
  ],
};
