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

export const SubscriptionFreshType: KeyRules = {
  FRESH_NORMAL: "Normal",
  FRESH_100_DAYS: "100",
}

export const LogEventEnum: KeyRules = {
  CREATE: "Subscription was created",
  REFILL: "The refill order is created",
  PAUSE: "Subscription was paused",
  RESUME: "Subscription was restarted",
  COMPLETE: "Subscription was completed",
  MODIFY_ADDRESS: "Modify delivery address",
  MODIFY_SHIPMENT_DATE: "Modify shipment date",
  COMMENT_CREATE: "Add comment",
  COMMENT_MODIFY: "Modify comment",
  COMMENT_DELETE: "Delete comment",
}
