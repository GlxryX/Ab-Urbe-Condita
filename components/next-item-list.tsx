import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Item } from "../types/item";
import ItemCard from "./item-card";
import styles from "../styles/next-item-list.module.scss";

interface NextItemListProps {
  next: Item | null;
  language: 0 | 1;
}

export default function NextItemList(props: NextItemListProps) {
  const { next, language } = props;

  return (
    <div className={styles.container}>
      <Droppable droppableId="next" direction="horizontal">
        {(provided) => (
          <div className={styles.wrapper}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.list}
            >
              {next && (
                <ItemCard draggable index={0} item={next} key={next.id} language={language} />
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}