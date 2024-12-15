import React from "react";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { Item, PlayedItem } from "../types/item";
import styles from "../styles/item-card.module.scss";

type Props = {
  draggable?: boolean;
  flippedId?: null | string;
  index: number;
  item: Item | PlayedItem;
  setFlippedId?: (flippedId: string | null) => void;
  language: 0 | 1;
};

export default function ItemCard(props: Props) {
  const { draggable, index, item, language } = props;

  if (!item) {
    console.error(`ItemCard rendered without an item at index ${index}`);
    return null;
  }

  const displayEvent = language === 0 ? item.eventEnglish : item.eventLatin;
  const displayYear = language === 0 ? item.yearLabelEnglish : `${item.yearLabelLatin} AUC`;

  return (
    <Draggable
      isDragDisabled={!draggable}
      draggableId={item.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={classNames(styles.itemCard, {
            [styles.played]: "played" in item,
            [styles.dragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.front}>
            <div className={styles.content}>
              <div className={styles.label}>{displayEvent}</div>
              {"played" in item && (
                <div
                  className={classNames(styles.dateDisplay, {
                    [styles.correct]: item.played.correct,
                    [styles.incorrect]: !item.played.correct,
                  })}
                >
                  <span>{displayYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}