import { supabase } from "@utils/supabaseClient";

export const fetchData = async (
  table: string,
  type: string,
  gender: string,
  age: number[],
  weight: string,
) => {
  try {
    let query = supabase.from(table).select("*");

    if (type === "dog") {
      query = query.eq("type", "강아지");
    } else if (type === "cat") {
      query = query.eq("type", "고양이");
    }

    if (gender === "male") {
      query = query.eq("sex_cd", "M");
    } else if (gender === "female") {
      query = query.eq("sex_cd", "F");
    } else {
      query = query.eq("sex_cd", "Q");
    }

    const [minAge, maxAge] = age;
    const [minWeight, maxWeight] = weight;
    query = query.gte("calculated_age", minAge).lte("calculated_age", maxAge);
    query = query
      .gte("calculated_weight", minWeight)
      .lte("calculated_weight", maxWeight);

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};
