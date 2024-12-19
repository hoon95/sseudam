import { supabase } from "@utils/supabaseClient";

// Supabase Database 조회
export const fetchData = async (table: string) => {
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
