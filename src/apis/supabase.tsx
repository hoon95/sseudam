import { supabase } from "@utils/supabaseClient";

interface RegionType {
  region: string;
}

export const fetchLocation = async (
  select: string,
  table: string,
  region?: string,
) => {
  try {
    let query = supabase.from(table).select(select);

    if (region && region !== "전체") {
      query = query.eq("region", region);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    if (!region) {
      return data.filter(
        (item: RegionType, index: number, self: RegionType[]) =>
          index === self.findIndex((t) => t.region === item.region),
      );
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchData = async (
  table: string,
  type: string,
  gender: string,
  age: number[],
  weight: string,
  region?: string,
  city?: string,
  id?: number,
) => {
  try {
    let query = supabase.from(table).select("*");

    if (type === "dog") {
      query = query.eq("upKindNm", "개");
    } else if (type === "cat") {
      query = query.eq("upKindNm", "고양이");
    }

    if (gender === "all") {
      // query = query.eq("sex_cd", "");
    } else if (gender === "male") {
      query = query.eq("sex_cd", "M");
    } else if (gender === "female") {
      query = query.eq("sex_cd", "F");
    } else {
      query = query.eq("sex_cd", "Q");
    }

    const [minAge, maxAge] = age;
    const [minWeight, maxWeight] = weight;

    if (age && weight) {
      query = query.gte("calculated_age", minAge).lte("calculated_age", maxAge);
      query = query
        .gte("calculated_weight", minWeight)
        .lte("calculated_weight", maxWeight);
    }

    if (region && region !== "전체") {
      query = query.like("org_nm", `${region}%`);
    }
    if (city && city !== "전체") {
      query = query.like("org_nm", `%${city}`);
    }

    if (id) {
      query = query.eq("desertion_no", id);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchDetail = async (id?: number) => {
  try {
    let query = supabase.from("list").select("*");

    if (id) {
      query = query.eq("desertion_no", id);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};
