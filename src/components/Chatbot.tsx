import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X } from "lucide-react";
import chatbotImage from "@/assets/chatbot.png";
import chatbotUserImage from "@/assets/chatotuser.jpg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  showIntro?: boolean;
}

export const Chatbot = ({ showIntro = false }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello. I am a support staff member of The Truth.",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "We are here to help you with any questions about our services, features, or how to use our platform. Please feel free to ask anything.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. Our team will get back to you shortly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Hide chatbot when intro video is showing
  if (showIntro) {
    return null;
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-4 z-[9999] w-24 h-24 rounded-full transition-transform duration-300 hover:scale-110 animate-bounce-slow border-0 outline-none"
            aria-label="Open chatbot"
            style={{ boxShadow: 'none', position: 'fixed' }}
          >
            <img
              src={chatbotImage}
              alt="Chatbot"
              className="w-full h-full object-cover rounded-full pointer-events-none"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-900 border-gray-300">
          <p>Contact AI Assistant</p>
        </TooltipContent>
      </Tooltip>

      {/* Chat Dialog - Positioned in lower right corner */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[600px] p-0 flex flex-col sm:rounded-lg fixed bottom-32 right-12 top-auto left-auto translate-x-0 translate-y-0 z-[9998] [&>button]:hidden">
          {/* Header with image in upper right */}
          <div className="relative bg-[#4A5568] dark:bg-[#2D3748] text-white px-4 py-3 rounded-tl-lg rounded-tr-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={chatbotImage}
                    alt="Chatbot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">The Truth</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 bg-white dark:bg-gray-50">
            <div className="px-4 py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <img
                        src={chatbotImage}
                        alt="Bot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gray-200 dark:bg-gray-300 text-gray-800 dark:text-gray-900"
                        : "bg-gray-700 dark:bg-gray-600 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                      <img
                        src={chatbotUserImage}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-white dark:bg-gray-50 p-4 rounded-bl-lg rounded-br-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your message"
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-[#4A5568] dark:bg-[#2D3748] hover:bg-[#5A6578] dark:hover:bg-[#3D4758] text-white flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        [data-radix-dialog-overlay] {
          z-index: 9997 !important;
        }
      `}</style>
    </>
  );
};

