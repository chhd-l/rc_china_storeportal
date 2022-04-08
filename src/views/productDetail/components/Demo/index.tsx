import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

const DragHandle = SortableHandle(() => <span>::</span>);
const SortableItem = SortableElement(
  ({
    value,
    idx,
    items,
    setItems,
  }: {
    value: any;
    idx: number;
    items: any;
    setItems: Function;
  }) => {
    return (
      <div>
        <input
          defaultValue={value}
          onBlur={(e) => {
            console.info("index", idx);
            let newItems = [...items];
            newItems[idx] = e.target.value;
            console.info("newItems", newItems);
            setItems(newItems);
          }}
          style={{ marginBottom: "20px" }}
        />
        <DragHandle />
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, setItems }: { items: any; setItems: Function }) => {
    return (
      <ul>
        {items.map((value: any, index: number) => {
          console.info("idnex......", index);
          return (
            <SortableItem
              key={`item-${value}`}
              items={items}
              idx={index}
              index={index}
              setItems={setItems}
              value={value}
            />
          );
        })}
      </ul>
    );
  }
);

// const SortableContainer = sortableContainer(({ children }) => {
//   return <ul>{children}</ul>;
// });
const SortableComponent = () => {
  const [items, setItems] = useState<any[]>(["", ""]);
  useEffect(() => {
    console.info(items);
  }, [items[1]]);
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    console.info("items", items);
    let newItems = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(newItems);
    console.info("moved.....", newItems);
  };
  return (
    <SortableList
      useDragHandle={true}
      items={items}
      setItems={setItems}
      onSortEnd={onSortEnd}
    />
  );
};

export default SortableComponent;
