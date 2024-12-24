"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const client = await createClient();
  console.log("formData:", formData);
  const { error } = await client.from("transactions").insert(validated.data);
  // const { error } = await client.from("transactions").insert(formData);

  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
}
