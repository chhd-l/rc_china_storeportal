import { KeyRules } from "@/framework/types/common";

export const orderStatusType: KeyRules = {
  UNPAID: 'Unpaid',
  TO_SHIP: 'To ship',
  SHIPPED: 'Shipped',
  COMPLETED: 'Completed',
  VOID: 'Cancellation',
}
