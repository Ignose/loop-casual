import { create, haveEquipped, Item, myDaycount, myHash, myMaxhp, restoreHp, runChoice, use, visitUrl } from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $monsters,
  $skill,
  ensureEffect,
  get,
  have,
  Macro,
  uneffect,
} from "libram";
import { Quest, Task } from "../engine/task";
import { CombatStrategy, killMacro } from "../engine/combat";
import { OutfitSpec, step } from "grimoire-kolmafia";
import { globalStateCache } from "../engine/state";
import { Priorities } from "../engine/priority";
import { tryPlayApriling } from "../engine/resources";

export function shenItem(item: Item) {
  return (
    get("shenQuestItem") === item.name &&
    (step("questL11Shen") === 1 || step("questL11Shen") === 3 || step("questL11Shen") === 5)
  );
}

const Copperhead: Task[] = [
  {
    name: "Copperhead Start",
    after: ["Macguffin/Diary"],
    completed: () => step("questL11Shen") >= 1,
    do: $location`The Copperhead Club`,
    choices: { 1074: 1 },
    limit: { tries: 1 },
  },
  {
    name: "Copperhead",
    after: ["Copperhead Start"],
    ready: () =>
      step("questL11Shen") === 2 || step("questL11Shen") === 4 || step("questL11Shen") === 6,
    completed: () => step("questL11Shen") === 999,
    prepare: () => {
      if (have($item`crappy waiter disguise`))
        ensureEffect($effect`Crappily Disguised as a Waiter`);
    },
    do: $location`The Copperhead Club`,
    combat: new CombatStrategy().kill($monster`Mob Penguin Capo`),
    orbtargets: () => {
      if (have($familiar`Robortender`)) return [$monster`Mob Penguin Capo`];
      return [];
    },
    outfit: (): OutfitSpec => {
      if (have($familiar`Robortender`)) {
        const target = globalStateCache.orb().prediction($location`The Copperhead Club`);
        if (target === $monster`Mob Penguin Capo`)
          return { equip: $items`miniature crystal ball`, familiar: $familiar`Robortender` };
        else return { equip: $items`miniature crystal ball` };
      }
      return {};
    },
    choices: () => {
      return {
        852: 1,
        853: 1,
        854: 1,
        855: get("copperheadClubHazard") !== "lantern" ? 3 : 4,
      };
    },
    limit: { tries: 30 }, // Extra waiter disguise adventures
  },
  {
    name: "Bat Snake",
    after: ["Copperhead Start", "Bat/Use Sonar 1"],
    ready: () => shenItem($item`The Stankara Stone`),
    priority: () => {
      const jar_needed =
        !have($item`killing jar`) &&
        !have($familiar`Melodramedary`) &&
        (get("gnasirProgress") & 4) === 0 &&
        get("desertExploration") < 100;
      if (
        jar_needed &&
        get("lastEncounter") === "banshee librarian" &&
        have($skill`Emotionally Chipped`) &&
        get("_feelEnvyUsed") < 3 &&
        get("_feelNostalgicUsed") < 3
      )
        return Priorities.Wanderer;
      else return Priorities.None;
    },
    completed: () =>
      step("questL11Shen") === 999 ||
      have($item`The Stankara Stone`) ||
      (myDaycount() === 1 && step("questL11Shen") > 1),
    do: $location`The Batrat and Ratbat Burrow`,
    combat: new CombatStrategy()
      .macro(() => {
        const jar_needed =
          !have($item`killing jar`) &&
          !have($familiar`Melodramedary`) &&
          (get("gnasirProgress") & 4) === 0 &&
          get("desertExploration") < 100;
        if (jar_needed && get("lastEncounter") === "banshee librarian") {
          return Macro.trySkill($skill`Feel Nostalgic`)
            .trySkill($skill`Feel Envy`)
            .step(killMacro());
        }
        return new Macro();
      }, $monsters`batrat, ratbat`)
      .killHard($monster`Batsnake`)
      .killItem(),
    outfit: { modifier: "item", avoid: $items`broken champagne bottle` },
    limit: { soft: 10 },
    orbtargets: () => [],
    delay: () => (step("questL04Bat") >= 3 ? 5 : 0),
  },
  {
    name: "Cold Snake",
    after: ["Copperhead Start", "McLargeHuge/Trapper Return"],
    ready: () => shenItem($item`The First Pizza`) && !get("noncombatForcerActive"),
    completed: () =>
      step("questL11Shen") === 999 ||
      have($item`The First Pizza`) ||
      (myDaycount() === 1 && step("questL11Shen") > 3),
    prepare: () => {
      restoreHp(myMaxhp());
      tryPlayApriling("+combat");
    },
    do: $location`Lair of the Ninja Snowmen`,
    outfit: () => {
      const spec: OutfitSpec = {
        modifier: "50 combat, init",
        skipDefaults: true,
        familiar: $familiar`Jumpsuited Hound Dog`,
        avoid: $items`miniature crystal ball`,
      };
      if (have($familiar`Trick-or-Treating Tot`) && !have($item`li'l ninja costume`))
        spec.familiar = $familiar`Trick-or-Treating Tot`;
      if (
        have($item`latte lovers member's mug`) &&
        get("latteModifier").includes("Combat Rate: 10")
      ) {
        // Ensure kramco does not override +combat
        spec.offhand = $item`latte lovers member's mug`;
      }
      return spec;
    },
    combat: new CombatStrategy().killHard([
      $monster`Frozen Solid Snake`,
      $monster`ninja snowman assassin`,
    ]),
    orbtargets: () => undefined, // no assassins in orbs
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Hot Snake Precastle",
    after: ["Copperhead Start", "Giant/Ground"],
    ready: () =>
      shenItem($item`Murphy's Rancid Black Flag`) && !have($item`steam-powered model rocketship`),
    completed: () => step("questL11Shen") === 999 || have($item`Murphy's Rancid Black Flag`),
    do: $location`The Castle in the Clouds in the Sky (Top Floor)`,
    outfit: { equip: $items`Mohawk wig`, modifier: "-combat" },
    choices: () => {
      return {
        675: 4,
        676: 4,
        677: step("questL10Garbage") >= 10 ? 2 : 1,
        678: step("questL10Garbage") >= 10 ? 3 : 1,
        679: 1,
        1431: haveEquipped($item`Mohawk wig`) ? 4 : 1,
      };
    },
    orbtargets: () => [],
    combat: new CombatStrategy().killHard($monster`Burning Snake of Fire`),
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Hot Snake Postcastle",
    after: ["Copperhead Start", "Giant/Ground"],
    ready: () =>
      shenItem($item`Murphy's Rancid Black Flag`) && have($item`steam-powered model rocketship`),
    completed: () => step("questL11Shen") === 999 || have($item`Murphy's Rancid Black Flag`),
    do: $location`The Castle in the Clouds in the Sky (Top Floor)`,
    choices: { 675: 4, 676: 4, 677: 1, 678: 1, 679: 1, 1431: 4 },
    outfit: { modifier: "+combat" },
    combat: new CombatStrategy().killHard($monster`Burning Snake of Fire`),
    orbtargets: () => [],
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Sleaze Star Snake",
    after: ["Copperhead Start", "Giant/Unlock HITS"],
    ready: () => shenItem($item`The Eye of the Stars`),
    completed: () => step("questL11Shen") === 999 || have($item`The Eye of the Stars`),
    do: $location`The Hole in the Sky`,
    combat: new CombatStrategy().killHard($monster`The Snake With Like Ten Heads`),
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Sleaze Frat Snake",
    after: ["Copperhead Start"],
    ready: () => shenItem($item`The Lacrosse Stick of Lacoronado`),
    completed: () => step("questL11Shen") === 999 || have($item`The Lacrosse Stick of Lacoronado`),
    do: $location`The Smut Orc Logging Camp`,
    combat: new CombatStrategy().killHard($monster`The Frattlesnake`),
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Spooky Snake Precrypt",
    after: ["Copperhead Start"],
    ready: () => shenItem($item`The Shield of Brook`) && step("questL07Cyrptic") < 999,
    completed: () => step("questL11Shen") === 999 || have($item`The Shield of Brook`),
    do: $location`The Unquiet Garves`,
    combat: new CombatStrategy().killHard($monster`Snakeleton`),
    limit: { soft: 10 },
    delay: 5,
  },
  {
    name: "Spooky Snake Postcrypt",
    after: ["Copperhead Start"],
    ready: () => shenItem($item`The Shield of Brook`) && step("questL07Cyrptic") === 999,
    completed: () => step("questL11Shen") === 999 || have($item`The Shield of Brook`),
    do: $location`The VERY Unquiet Garves`,
    combat: new CombatStrategy().killHard($monster`Snakeleton`),
    limit: { soft: 10 },
    delay: 5,
  },
];

const Zepplin: Task[] = [
  {
    name: "Protesters Start",
    after: ["Macguffin/Diary"],
    completed: () => step("questL11Ron") >= 1,
    do: $location`A Mob of Zeppelin Protesters`,
    combat: new CombatStrategy().killHard($monster`The Nuge`),
    choices: { 856: 1, 857: 1, 858: 1, 866: 2, 1432: 1 },
    limit: { tries: 1 },
    freeaction: true,
  },
  {
    name: "Protesters",
    after: ["Protesters Start"],
    completed: () => get("zeppelinProtestors") >= 80,
    acquire: [{ item: $item`11-leaf clover` }],
    prepare: (): void => {
      if (get("zeppelinProtestors") < 80) {
        if (have($skill`Bend Hell`) && !get("_bendHellUsed")) ensureEffect($effect`Bendin' Hell`);
        use($item`11-leaf clover`);
      }
    },
    do: $location`A Mob of Zeppelin Protesters`,
    combat: new CombatStrategy().killHard($monster`The Nuge`),
    choices: { 856: 1, 857: 1, 858: 1, 866: 2, 1432: 1 },
    outfit: { modifier: "sleaze dmg, sleaze spell dmg", familiar: $familiar`Left-Hand Man` },
    freeaction: true, // fully maximize outfit
    limit: { tries: 5, message: "Maybe your available sleaze damage is too low." },
  },
  {
    name: "Protesters Finish",
    after: ["Protesters"],
    completed: () => step("questL11Ron") >= 2,
    do: $location`A Mob of Zeppelin Protesters`,
    combat: new CombatStrategy().killHard($monster`The Nuge`),
    choices: { 856: 1, 857: 1, 858: 1, 866: 2, 1432: 1 },
    limit: { tries: 2 }, // If clovers were used before the intro adventure, we need to clear both the intro and closing advs here.
    freeaction: true,
  },
  {
    name: "Zepplin",
    after: ["Protesters Finish"],
    acquire: [
      { item: $item`glark cable`, useful: () => get("_glarkCableUses") < 5 },
      { item: $item`Red Zeppelin ticket` },
    ],
    prepare: () => {
      if (have($item`Red Zeppelin ticket`)) return;
      visitUrl("woods.php");
      visitUrl("shop.php?whichshop=blackmarket");
      visitUrl("shop.php?whichshop=blackmarket&action=buyitem&whichrow=289&ajax=1&quantity=1");
      if (!have($item`Red Zeppelin ticket`))
        throw `Unable to buy Red Zeppelin ticket; please buy manually`;
    },
    completed: () => step("questL11Ron") >= 5,
    do: $location`The Red Zeppelin`,
    combat: new CombatStrategy()
      .killHard($monster`Ron "The Weasel" Copperhead`)
      .macro((): Macro => {
        if (get("_glarkCableUses") < 5) return new Macro().tryItem($item`glark cable`);
        else return new Macro();
      }, $monsters`man with the red buttons, red skeleton, red butler, Red Fox`)
      .banish($monsters`Red Herring, Red Snapper`)
      .kill($monsters`man with the red buttons, red skeleton, red butler, Red Fox`),
    limit: { soft: 12 },
  },
];

const Dome: Task[] = [
  {
    name: "Talisman",
    after: [
      "Copperhead",
      "Zepplin",
      "Bat Snake",
      "Cold Snake",
      "Hot Snake Precastle",
      "Hot Snake Postcastle",
    ],
    completed: () => have($item`Talisman o' Namsilat`),
    do: () => create($item`Talisman o' Namsilat`),
    limit: { tries: 1 },
    freeaction: true,
  },
  {
    name: "Palindome Dog",
    after: ["Talisman"],
    acquire: [{ item: $item`disposable instant camera` }],
    completed: () => have($item`photograph of a dog`) || step("questL11Palindome") >= 3,
    do: $location`Inside the Palindome`,
    outfit: { equip: $items`Talisman o' Namsilat`, modifier: "-combat" },
    combat: new CombatStrategy()
      .banish($monsters`Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat`)
      .macro(
        new Macro().item($item`disposable instant camera`),
        $monsters`Bob Racecar, Racecar Bob`
      )
      .kill($monsters`Bob Racecar, Racecar Bob, Drab Bard, Remarkable Elba Kramer`),
    limit: { soft: 20 },
  },
  {
    name: "Palindome Dudes",
    after: ["Palindome Dog"],
    completed: () => have(Item.get(7262)) || step("questL11Palindome") >= 3,
    do: $location`Inside the Palindome`,
    outfit: { equip: $items`Talisman o' Namsilat`, modifier: "-combat" },
    combat: new CombatStrategy()
      .banish($monsters`Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat`)
      .kill($monsters`Bob Racecar, Racecar Bob, Drab Bard, Remarkable Elba Kramer`),
    limit: { soft: 20 },
  },
  {
    name: "Palindome Photos",
    after: ["Palindome Dudes"],
    completed: () =>
      (have($item`photograph of a red nugget`) &&
        have($item`photograph of God`) &&
        have($item`photograph of an ostrich egg`)) ||
      step("questL11Palindome") >= 3,
    do: $location`Inside the Palindome`,
    outfit: { equip: $items`Talisman o' Namsilat`, modifier: "-combat" },
    limit: { soft: 20 },
  },
  {
    name: "Alarm Gem",
    after: ["Palindome Photos"],
    completed: () => step("questL11Palindome") >= 3,
    do: () => {
      if (have(Item.get(7262))) use(Item.get(7262));
      visitUrl("place.php?whichplace=palindome&action=pal_droffice");
      visitUrl(
        `choice.php?pwd=${myHash()}&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265`
      );
      use(1, Item.get(7270));
      visitUrl("place.php?whichplace=palindome&action=pal_mroffice");
      visitUrl("clan_viplounge.php?action=hottub");
      uneffect($effect`Beaten Up`);
    },
    outfit: { equip: $items`Talisman o' Namsilat` },
    limit: { tries: 1 },
    freeaction: true,
  },
  {
    name: "Open Alarm",
    after: ["Alarm Gem"],
    completed: () => step("questL11Palindome") >= 5,
    do: () => {
      if (!have($item`wet stunt nut stew`)) create($item`wet stunt nut stew`);
      visitUrl("place.php?whichplace=palindome&action=pal_mrlabel");
    },
    outfit: { equip: $items`Talisman o' Namsilat` },
    limit: { tries: 1 },
    freeaction: true,
  },
];

export const PalindomeQuest: Quest = {
  name: "Palindome",
  tasks: [
    ...Copperhead,
    ...Zepplin,
    ...Dome,
    {
      name: "Boss",
      after: ["Open Alarm"],
      completed: () => step("questL11Palindome") === 999,
      do: (): void => {
        visitUrl("place.php?whichplace=palindome&action=pal_drlabel");
        runChoice(-1);
      },
      outfit: { equip: $items`Talisman o' Namsilat, Mega Gem` },
      choices: { 131: 1 },
      boss: true,
      combat: new CombatStrategy().kill(),
      limit: { tries: 1 },
    },
  ],
};
