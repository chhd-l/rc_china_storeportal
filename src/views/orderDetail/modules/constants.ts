import { OrderStatusLabel, OrderStatusValue } from "@/framework/types/order";

interface StepProps {
  label: OrderStatusLabel;
  key: OrderStatusValue;
  updateTime?: string;
}

// const createStepList = () => {
//   let StepList: StepProps[] = [];
//   Object.keys(OrderStatusLabel).map((key) => {
//     StepList.push({
//       label: OrderStatusLabel[key],
//       key: OrderStatusValue[key],
//     });
//   });
//   return StepList;
// };

export const stepList: StepProps[] = [
  { label: OrderStatusLabel.Unpaid, key: OrderStatusValue.Unpaid },
  { label: OrderStatusLabel.Toship, key: OrderStatusValue.Toship },
  { label: OrderStatusLabel.Shipped, key: OrderStatusValue.Shipped },
  { label: OrderStatusLabel.Completed, key: OrderStatusValue.Completed },
  { label: OrderStatusLabel.Cancellation, key: OrderStatusValue.Cancellation },
];
