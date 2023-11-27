import wait from "@/lib/wait";
import React from "react";
import Card from "./components/Card";

export async function getUses() {
  const response = await fetch(
    "https://strapi-app-tnshv.ondigitalocean.app/api/uses",
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer 9c54bfb85749cfdc1ea1f98fb2f1a64b7cac4ad7662fda7a099556577a20343b945b20f2b1b68dfab82266337804834c1a1ef342c8a4c5e2886835ba072f49746a825df9e09c46fa214a33fa384134c89d18c0dae1d142c2c441f5876fa4a984012020b22d38a08b5fc2fd60ce80248ebae5c5c2f9511e84c7cae90cfe3a246c`,
      },
    }
  );

  const uses = await response.json();

  return uses;
}

export default async function page() {
  const uses = await getUses();

  console.log(uses);

  return (
    <div>
      {uses.data.map(
        // @ts-ignore
        (item, index) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <Card
              index={index}
              title={""}
              description={""}
              image={""}
              key={index}
            />
          );
        }
      )}
    </div>
  );
}
