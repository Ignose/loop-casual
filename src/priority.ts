/**
 * Temporary priorities that override the routing.
 */

import { familiarWeight, Location, Monster } from "kolmafia";
import { $effect, $familiar, $skill, have } from "libram";
import { CombatStrategy, MonsterStrategy } from "./combat";
import { moodCompatible } from "./moods";
import { AbsorptionTargets } from "./tasks/absorb";
import { Task } from "./tasks/structure";

export enum OverridePriority {
  Always = 10000,
  Free = 1000,
  Start = 900,
  LastCopyableMonster = 100,
  Effect = 20,
  GoodOrb = 15,
  YR = 10,
  GoodGoose = 1,
  None = 0,
  BadOrb = -2,
  BadGoose = -16,
  BadMood = -100,
  Last = -10000,
}

export class Prioritization {
  private priorities = new Set<OverridePriority>();
  private orb_monster?: Monster = undefined;

  constructor(
    task: Task,
    orb_predictions: Map<Location, Monster>,
    absorptionTargets: AbsorptionTargets
  ) {
    const base = task.priority?.() ?? OverridePriority.None;
    if (base !== OverridePriority.None) this.priorities.add(base);

    // Check if Grey Goose is charged
    if (needsChargedGoose(task, absorptionTargets)) {
      if (familiarWeight($familiar`Grey Goose`) < 6) {
        this.priorities.add(OverridePriority.BadGoose);
      } else {
        this.priorities.add(OverridePriority.GoodGoose);
      }
    }

    // Dodge useless monsters with the orb
    if (task.do instanceof Location && orb_predictions !== undefined) {
      const next_monster = orb_predictions.get(task.do);
      if (next_monster !== undefined) {
        this.orb_monster = next_monster;
        if (task.orbtargets === undefined) {
          // Determine if a monster is useful or not based on the combat goals
          const task_combat = task.combat ?? new CombatStrategy();
          const next_monster_strategy = task_combat.currentStrategy(next_monster);

          const next_useless =
            (next_monster_strategy === MonsterStrategy.Ignore ||
              next_monster_strategy === MonsterStrategy.IgnoreNoBanish ||
              next_monster_strategy === MonsterStrategy.Banish) &&
            !absorptionTargets.isTarget(next_monster) &&
            (!absorptionTargets.isReprocessTarget(next_monster) ||
              familiarWeight($familiar`Grey Goose`) < 6);

          const others_useless =
            task_combat.can(MonsterStrategy.Ignore) ||
            task_combat.can(MonsterStrategy.IgnoreNoBanish) ||
            task_combat.can(MonsterStrategy.Banish);

          const others_useful =
            absorptionTargets.hasTargets(task.do) ||
            absorptionTargets.hasReprocessTargets(task.do) ||
            task_combat.can(MonsterStrategy.Kill) ||
            task_combat.can(MonsterStrategy.KillFree) ||
            task_combat.can(MonsterStrategy.KillHard) ||
            task_combat.can(MonsterStrategy.KillItem);

          if (next_useless && others_useful) {
            this.priorities.add(OverridePriority.BadOrb);
          } else if (!next_useless && others_useless) {
            this.priorities.add(OverridePriority.GoodOrb);
          }
        } else {
          // Use orbtargets to decide if the next monster is useful
          const fromTask = task.orbtargets();
          if (fromTask !== undefined) {
            const targets = [
              ...fromTask,
              ...absorptionTargets.remainingAbsorbs(task.do),
              ...absorptionTargets.remainingReprocess(task.do),
            ];
            if (targets.length > 0) {
              if (targets.find((t) => t === next_monster) === undefined) {
                this.priorities.add(OverridePriority.BadOrb);
              } else {
                this.priorities.add(OverridePriority.GoodOrb);
              }
            }
          }
        }
      }
    }

    // Ensure that the current +/- combat effects are compatible
    //  (Macguffin/Forest is tough and doesn't need much +combat; just power though)
    const outfit_spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
    if (!moodCompatible(outfit_spec?.modifier) && task.name !== "Macguffin/Forest") {
      this.priorities.add(OverridePriority.BadMood);
    }

    // Burn off desert debuffs
    if (
      (have($effect`Prestidigysfunction`) || have($effect`Turned Into a Skeleton`)) &&
      task.combat &&
      task.combat.can(MonsterStrategy.KillItem)
    ) {
      this.priorities.add(OverridePriority.BadMood);
    }

    // Wait until we get a -combat skill before doing any -combat
    if (
      outfit_spec?.modifier &&
      outfit_spec.modifier.includes("-combat") &&
      !have($skill`Phase Shift`)
    ) {
      this.priorities.add(OverridePriority.BadMood);
    }
  }

  public explain(): string {
    const reasons = new Map<OverridePriority, string>([
      [OverridePriority.Always, "Forced"],
      [OverridePriority.Free, "Free action"],
      [OverridePriority.Start, "Initial tasks"],
      [OverridePriority.LastCopyableMonster, "Copy last monster"],
      [OverridePriority.Effect, "Useful effect"],
      [OverridePriority.GoodOrb, this.orb_monster ? `Target ${this.orb_monster}` : `Target ?`],
      [OverridePriority.YR, "Yellow ray"],
      [OverridePriority.GoodGoose, "Goose charged"],
      [OverridePriority.BadOrb, this.orb_monster ? `Avoid ${this.orb_monster}` : `Avoid ?`],
      [OverridePriority.BadGoose, "Goose not charged"],
      [OverridePriority.BadMood, "Wrong combat modifiers"],
    ]);
    return [...this.priorities]
      .map((priority) => reasons.get(priority))
      .filter((priority) => priority !== undefined)
      .join(", ");
  }

  public has(priorty: OverridePriority) {
    return this.priorities.has(priorty);
  }

  public score(): number {
    let result = 0;
    for (const priority of this.priorities) {
      result += priority;
    }
    return result;
  }
}

function needsChargedGoose(task: Task, absorptionTargets: AbsorptionTargets): boolean {
  // Note that we purposefully do not check if we will be equipping the goose
  // in the location. We want to eventually reprocess everything, and so a
  // charged goose allows us to use the orb to target reprocess monsters.
  return task.do instanceof Location && absorptionTargets.hasReprocessTargets(task.do);
}
