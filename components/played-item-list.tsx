// played-item-list.tsx
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Item } from "../types/item";
import ItemCard from "./item-card";
import styles from "../styles/played-item-list.module.scss";

interface PlayedItemListProps {
  badlyPlacedIndex: number | null;
  isDragging: boolean;
  items: Item[];
  language: 'latin' | 'english';
}

export default function PlayedItemList(props: PlayedItemListProps) {
  const { badlyPlacedIndex, isDragging, items, language } = props;

  const [flippedId, setFlippedId] = React.useState<null | string>(null);

  React.useEffect(() => {
    if (isDragging && flippedId !== null) {
      setFlippedId(null);
    }
  }, [flippedId, isDragging]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listContainer}>
        <Droppable droppableId="played" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.list}
            >
              <div className={styles.timelineContainer}>
                <div className={styles.timeline}></div>
              </div>
              <div className={styles.items}>
                {items.map((item, index) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    language={language}
                    draggable={badlyPlacedIndex !== null}
                    flippedId={flippedId}
                    setFlippedId={setFlippedId}
                  />
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}