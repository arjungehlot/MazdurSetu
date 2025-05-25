"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Send, Check, CheckCheck, Smile, Image as ImageIcon, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import moment from "moment";
import type { User } from "@supabase/auth-js";

type Notification = {
  id: number;
  name: string;
  message: string;
  avatar: string;
};

type Message = {
  id: number;
  text: string;
  sender: string;
  time: string;
  status: "sent" | "received" | "read";
};

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, name: "Employer", message: "Your job application is under review.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Worker", message: "Can we schedule a meeting?", avatar: "https://images.unsplash.com/photo-1579047917338-a6a69144fe63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Client", message: "Payment received, thank you!", avatar: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]);
  const [selectedChat, setSelectedChat] = useState<Notification | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/sign-in");
      } else {
        setUser(data.user as User);
      }
    };

    fetchUser();
  }, [router, supabase.auth]);

  useEffect(() => {
    if (user) {
      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, supabase]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: user?.id || "unknown",
      time: new Date().toISOString(),
      status: "sent",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    const { error } = await supabase.from("messages").insert([newMessage]);

    if (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSelectChat = (notification: Notification) => {
    setSelectedChat(notification);
    // Fetch messages for the selected chat (you can implement this logic)
    setMessages([]); // Reset messages for now
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {user && <DashboardSidebar user={user} />}

      {/* Notifications */}
      <div className="w-1/4 border-r p-4 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center gap-4 p-3 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
              selectedChat?.id === notif.id ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
            onClick={() => handleSelectChat(notif)}
          >
            <Image src={notif.avatar} alt={notif.name} width={40} height={40} className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-medium">{notif.name}</p>
              <p className="text-gray-500 text-sm">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="w-3/4 p-4 flex flex-col bg-white dark:bg-gray-800">
        <h2 className="text-lg font-bold mb-4">
          {selectedChat ? `Chat with ${selectedChat.name}` : "Select a chat to start messaging"}
        </h2>
        <div className="flex-1 overflow-y-auto p-4 border border-gray-300 dark:border-gray-700 rounded">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === user?.id ? "justify-end" : "justify-start"} mb-2`}>
              <div className={`p-2 ${msg.sender === user?.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} rounded-lg max-w-xs`}>
                <p>{msg.text}</p>
                <div className="flex items-center justify-end text-xs mt-1">
                  <span>{moment(msg.time).format("h:mm A")}</span>
                  {msg.status === "sent" && <Check className="ml-1 h-4 w-4" />}
                  {msg.status === "received" && <CheckCheck className="ml-1 h-4 w-4" />}
                  {msg.status === "read" && <CheckCheck className="ml-1 h-4 w-4 text-blue-500" />}
                </div>
              </div>
            </div>
          ))}
          {isTyping && <div className="text-sm text-gray-500">Typing...</div>}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button variant="ghost">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}