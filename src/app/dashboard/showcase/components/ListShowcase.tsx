"use client";

import React, { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";

export default function ListShowcase({ data }: { data: any[] }) {
  const [first, setFirst] = useState(data);

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
        }
      )
      .subscribe();
    return () => {
      createClient.removeChannel(channel);
    };
  }, [data]);

  // console.log(data);

  return (
    <div>
      {data.map((item, index) => {
        return <div key={index}>a</div>;
      })}
    </div>
  );
}
