"use client";

import React, { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";

export default function ListShowcase({ data }: { data: any[] }) {
  const [showcase, setShowcase] = useState(data);

  useEffect(() => {
    const channel = createClient
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "device",
        },
        (payload) => {
          console.log(payload);
          setShowcase([...showcase, payload.new]);
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
        return <div key={index}>{item.device_name}</div>;
      })}
    </div>
  );
}
