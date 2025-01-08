import { supabase } from "@utils/supabaseClient";

export const sendMessage = async (
  senderId: string,
  senderName: string,
  receiverId: string,
  content: string,
) => {
  const { error } = await supabase.from("messages").insert([
    {
      sender_id: senderId,
      sender_name: senderName,
      receiver_id: receiverId,
      content,
    },
  ]);

  if (error) {
    console.error("Error sending message:", error);
  }
};

export const fetchMessage = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data || [];
};

export const subscribeToMessage = (callback: (message: any) => void) => {
  const channel = supabase
    .channel("chat")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        console.log("new message");
        callback(payload.new);
      },
    )
    .subscribe();

  return () => channel.unsubscribe();
};
