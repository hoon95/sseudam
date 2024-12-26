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
      query = query.like("kind_cd", "[개]%");
    } else if (type === "cat") {
      query = query.like("kind_cd", "[고양이]%");
    }

    if (gender === "male") {
      query = query.eq("sex_cd", "M");
    } else if (gender === "female") {
      query = query.eq("sex_cd", "F");
    } else {
      query = query.eq("sex_cd", "Q");
    }

    const currentYear = new Date().getFullYear();
    if (age.length > 0) {
      const [minAge, maxAge] = age;
      const minYear = Number(currentYear) - maxAge;
      const maxYear = Number(currentYear) - minAge;

      query = query
        .gte("age", `${minYear}(년생)`)
        .lte("age", `${maxYear}(년생)`);
    }

    // if (weight.length > 0) {
    //   const [minWeight, maxWeight] = weight;
    //   console.log(minWeight);
    //   console.log(maxWeight);
    //   query = query
    //     .gte("weight", `${minWeight}(Kg)`)
    //     .lte("weight", `${maxWeight}(Kg)`);
    // }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};
