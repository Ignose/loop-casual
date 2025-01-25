import { $effect, $item, $location, ensureEffect, get, PocketProfessor, questStep, StrictMacro } from "libram";
import { Priorities } from "../engine/priority";
import { Quest } from "../engine/task";
import { setLocation, maximize, myAscensions, visitUrl, myDaycount, Location, getAutoAttack, setAutoAttack, adv1, choiceFollowsFight, runCombat, inMultiFight } from "kolmafia";
import { potionSetup } from "../potions";
import { burnLibrams, freeFightMood, freeRunConstraints, ltbRun, meatMood, safeRestore, setChoice, targetMeat, targettingMeat, tryFindFreeRunOrBanish, useBuffExtenders } from "../lib";
import { acquire } from "../acquire";
import { freeFightOutfit, toSpec } from "../outfit";

export function garboAdventure<M extends StrictMacro>(
  loc: Location,
  macro: M,
): void {
  if (getAutoAttack() !== 0) setAutoAttack(0);
  makeCcs(macro);
  runCombatBy(() => adv1(loc, -1, ""));
}

function runCombatBy<T>(initiateCombatAction: () => T) {
  try {
    const result = initiateCombatAction();
    while (inMultiFight()) runCombat();
    if (choiceFollowsFight()) visitUrl("choice.php");
    return result;
  } catch (e) {
    throw `Combat exception! Last macro error: ${get(
      "lastMacroError",
    )}. Exception ${e}.`;
  }
}

function meatTargetSetup() {
  setLocation($location`Friar Ceremony Location`);
  potionSetup(false);
  maximize("MP", false);
  if(targettingMeat()) {
    meatMood(true, targetMeat(),false).execute(75);
  }
  safeRestore();
  freeFightMood().execute(50);
  useBuffExtenders();
  burnLibrams(400);
  if (
    myDaycount() === 2 &&
    questStep("questM16Temple") > 0 &&
    get("lastTempleAdventures") < myAscensions() &&
    acquire(1, $item`stone wool`, 3 * get("valueOfAdventure") + 100, false) > 0
  ) {
    ensureEffect($effect`Stone-Faced`);
    setChoice(582, 1);
    setChoice(579, 3);
    while (get("lastTempleAdventures") < myAscensions()) {
      const run = tryFindFreeRunOrBanish(freeRunConstraints()) ?? ltbRun();
      if (!run) break;
      run.constraints.preparation?.();
      freeFightOutfit(toSpec(run)).dress();
      garboAdventure($location`The Hidden Temple`, run.macro);
    }
  }
}

export const CopyTargetQuest: Quest = {
  name: "CopyTarget",
  tasks: [
    {
      name: "Pocket Professor",
      after: [],
      prepare: () => meatTargetSetup(),
      priority: () => Priorities.CopyTargetChain,
      completed: () => get("_pocketProfessorLectures") >= PocketProfessor.totalAvailableLectures(),
      do: () => visitUrl("council.php"),
      limit: { tries: 1 },
      freeaction: true,
    },
  ]
}
function makeCcs<M extends StrictMacro>(macro: M) {
  throw new Error("Function not implemented.");
}

