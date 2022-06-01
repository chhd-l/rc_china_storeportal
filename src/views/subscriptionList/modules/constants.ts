import { KeyRules } from "@/framework/types/common";

export const SubscriptionStatus: KeyRules = {
  ONGOING: "Ongoing",
  PAUSED: "Paused",
  COMPLETED: "Completed",
  INACTIVE: "Inactive",
}

export const SubscriptionType: KeyRules = {
  FRESH_BUY: "Autoship",
}

export const SubscriptionCycle: KeyRules = {
  QUARTER: "Quarter",
  HALF_YEAR: "Half year",
  YEAR: "Year",
}
