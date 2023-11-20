import React from "react";

interface Card {
  index: number;
  title: string;
  description: string;
  image: string;
}

export default function Card(props: Card) {
  return <div key={props.index}>Card</div>;
}
