import BaseTrend from "@/components/trend";
export default async function Trend({ type }) {
  const response = await fetch(`${process.env.API_URL}/trends/${type}`);
  const { amount, prevAmount } = await response.json();
  return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
}

// import BaseTrend from "@/components/trend";
// import { createClient } from "@/lib/supabase/server";

// export default async function Trend({ type }) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("transactions")
//     .select("amount, prevAmount")
//     .eq("type", type)
//     .single();

//   if (error) {
//     console.error("Error fetching trend data:", error);
//     return <div>Error loading trend data</div>;
//   }

//   if (!data) {
//     return <div>No trend data found</div>;
//   }

//   const { amount, prevAmount } = data;

//   return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
// }
