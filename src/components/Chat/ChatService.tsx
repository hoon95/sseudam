import { supabase } from "@utils/supabaseClient";

// 메시지 전송 함수
export const sendMessage = async (
  senderId: string,
  senderName: string,
  receiverId: string,
  content: string,
) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        sender_id: senderId,
        sender_name: senderName,
        receiver_id: receiverId,
        content,
      },
    ]);

  if (error) {
    console.error("Error sending message:", error);
  } else {
    console.log("Message sent:", data);
  }
};

// DB에서 메시지 가져오기 함수
export const fetchMessage = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true }); // 메시지를 시간 순으로 정렬

  console.log(data);

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data || []; // 메시지를 반환
};

export const subscribeToMessage = (callback: (message: any) => void) => {
  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        callback(payload.new);
      },
    )
    .subscribe();

  return () => channel.unsubscribe();
};
