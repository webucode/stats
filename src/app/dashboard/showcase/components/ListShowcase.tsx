"use client";

import React, { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import deleteShowcase from "../utils/deleteShowcase";
import { cookies } from "next/headers";

export default function ListShowcase({
  data,
  action,
}: {
  data: any[];
  action: any;
}) {
  const [showcase, setShowcase] = useState(data);

  useEffect(() => {
    const channel = createClient
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "device",
        },
        (payload) => {
          console.log(payload);
          payload.eventType === "INSERT" &&
            setShowcase([...showcase, payload.new]);

          payload.eventType === "DELETE" &&
            setShowcase(() => {
              const arr = showcase.filter((item) => item.id !== payload.old.id);
              return arr;
            });
        }
      )
      .subscribe();
    return () => {
      createClient.removeChannel(channel);
    };
  }, [data, showcase]);

  return (
    <div>
      {showcase.map((item, index) => {
        return (
          <div key={index}>
            <div>{item.device_name}</div>
            <form action={action}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit">delete</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
