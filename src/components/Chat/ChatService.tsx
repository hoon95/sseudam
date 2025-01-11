import { supabase } from "@utils/supabaseClient";

export const sendMessage = async (
  senderId: string,
  senderName: string,
  receiverId: string,
  content: string,
  roomId: string,
) => {
  const { error } = await supabase.from("messages").insert([
    {
      sender_id: senderId,
      sender_name: senderName,
      receiver_id: receiverId,
      content,
      room_id: roomId,
    },
  ]);

  if (error) {
    console.error("Error sending message:", error);
  }
};

export const fetchMessage = async (roomId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data || [];
};

export const subscribeToMessage = (
  roomId: string,
  callback: (message: any) => void,
) => {
  const channel = supabase
    .channel(`chat:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        console.log("new message in room", roomId);
        callback(payload.new);
      },
    )
    .subscribe();

  return () => channel.unsubscribe();
};
