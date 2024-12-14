import React from "react";
import classNames from "classnames";
// import { useSpring, animated } from "react-spring"; // Keep import for future use
import { Draggable } from "react-beautiful-dnd";
import { Item, PlayedItem } from "../types/item";
import styles from "../styles/item-card.module.scss";

type Props = {
  draggable?: boolean;
  flippedId?: null | string; // Keep for future
  index: number;
  item: Item | PlayedItem;
  setFlippedId?: (flippedId: string | null) => void; // Keep for future
  language: 'latin' | 'english';
};

export default function ItemCard(props: Props) {
  const { draggable, index, item, language } = props;
  // Temporarily comment out flip functionality
  /*
  const flipped = item?.id === flippedId;
  const cardSpring = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 750, friction: 100 },
  });
  */

  if (!item) {
    console.error(`ItemCard rendered without an item at index ${index}`);
    return null;
  }

  const displayEvent = language === 'latin' ? item.eventLatin : item.eventEnglish;
  const displayYear = language === 'latin' ? item.yearLabelLatin : item.yearLabelEnglish;

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