// import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabaseClient";

// Supabase Database 조회
export const fetchPetData = async () => {
  try {
    const { data, error } = await supabase.from("list").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
