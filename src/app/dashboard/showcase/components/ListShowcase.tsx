"use client";

import React, { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.device_name}</CardTitle>
            </CardHeader>
            <CardContent>{item.description}</CardContent>
            <CardDescription>{item.description}</CardDescription>

            <div className="flex justify-end">
              <form action={action}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit">delete</button>
              </form>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
