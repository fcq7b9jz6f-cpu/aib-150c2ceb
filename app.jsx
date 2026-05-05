'''
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Bot, User, Send, Plus, MessageSquare, Trash2, Code, ChevronRight, CornerDownLeft, Star, Settings 
} from "lucide-react";

const App = () => {
    const [chatHistory, setChatHistory] = useState([
        { id: 'intro-1', title: 'شرح مفهوم React Hooks' },
        { id: 'intro-2', title: 'أفكار لوصفة عشاء صحية' },
        { id: 'intro-3', title: 'مستقبل الذكاء الاصطناعي' },
    ]);
    const [chats, setChats] = useState({
        'intro-1': [
            { role: 'user', content: 'اشرح لي مفهوم React Hooks' },
            { role: 'assistant', content: 'بالتأكيد! React Hooks هي دوال تتيح لك "ربط" حالة React وميزات دورة الحياة من مكونات الدالة. إليك مثال بسيط:''' + `

` + `'''javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
` + `'''` + `

هذا هو ` + `**useState**` + `, أشهر Hook.'
            }
        ],
        'intro-2': [
             { role: 'user', content: 'أعطني أفكارًا لوصفة عشاء صحية وسريعة.' },
             { role: 'assistant', content: 'بالتأكيد! إليك فكرة رائعة: **سلمون مشوي مع الهليون والليمون**. \n\n**المكونات:**\n*   شريحة سلمون\n*   حزمة هليون\n*   ليمونة واحدة\n*   زيت زيتون\n*   ملح وفلفل\n\n**الطريقة:**\n1.  سخن الفرن إلى 200 درجة مئوية.\n2.  ضع السلمون والهليون في صينية خبز.\n3.  رش زيت الزيتون والملح والفلفل.\n4.  ضع شرائح الليمون فوق السلمون.\n5.  اخبز لمدة 12-15 دقيقة.\n\nصحة وعافية!' },
        ],
        'intro-3': [
             { role: 'user', content: 'ما هو مستقبل الذكاء الاصطناعي؟' },
             { role: 'assistant', content: 'مستقبل الذكاء الاصطناعي واعد للغاية ومليء بالاحتمالات التي قد تغير شكل حياتنا بشكل جذري. من المتوقع أن نرى تقدمًا هائلاً في مجالات مثل:\n\n*   **الطب الشخصي:** تحليل الجينات والبيانات الصحية لتقديم علاجات مخصصة.\n*   **القيادة الذاتية:** سيارات وشاحنات وطائرات بدون طيار تعمل بشكل مستقل تمامًا.\n*   **الإبداع المعزز:** أدوات تساعد الفنانين والكتاب والموسيقيين على توليد أفكار جديدة.\n*   **العلوم:** تسريع وتيرة الاكتشافات العلمية من خلال تحليل كميات هائلة من البيانات.' },
        ]
    });

    const createNewChat = () => {
        const newChatId = `chat-${Date.now()}`;
        setChatHistory(prev => [{ id: newChatId, title: "محادثة جديدة" }, ...prev]);
        setChats(prev => ({ ...prev, [newChatId]: [] }));
        return newChatId;
    };

    return (
        <HashRouter>
            <div className="flex h-screen w-full bg-ink text-bone font-sans overflow-hidden">
                <Sidebar chatHistory={chatHistory} createNewChat={createNewChat} />
                <main className="flex-1 flex flex-col h-full">
                    <Routes>
                        <Route path="/" element={<WelcomeScreen />} />
                        <Route path="/chat/:chatId" element={<ChatScreen chats={chats} setChats={setChats} setChatHistory={setChatHistory} />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
};

const Sidebar = ({ chatHistory, createNewChat }) => {
    const navigate = useNavigate();
    
    const handleNewChat = () => {
        const newId = createNewChat();
        navigate(`/chat/${newId}`);
    }

    return (
        <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="w-72 bg-midnight/50 backdrop-blur-xl border-l border-electric-cyan/10 flex flex-col p-4 h-full">
            <div className="flex-shrink-0 mb-6">
                <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-electric-cyan/10 hover:bg-electric-cyan/20 transition-colors duration-300 text-electric-cyan border border-electric-cyan/20">
                    <Plus size={18} />
                    <span>محادثة جديدة</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <h2 className="text-sm text-gray-400 mb-3 px-2">المحفوظات</h2>
                <nav className="flex flex-col gap-1">
                    {chatHistory.map(chat => (
                        <Link to={`/chat/${chat.id}`} key={chat.id} className="group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 truncate">
                            <MessageSquare size={16} className="opacity-60" />
                            <span className="flex-1 truncate">{chat.title}</span>
                            <Trash2 size={16} className="opacity-0 group-hover:opacity-60 text-red-500/70 hover:text-red-500 transition-opacity" onClick={(e) => { e.preventDefault(); /* Add delete logic here */ }} />
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex-shrink-0 pt-4 border-t border-electric-cyan/10">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700/50 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-cyan to-fuchsia-500 flex items-center justify-center">
                        <User className="text-ink" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">المستخدم</p>
                        <p className="text-xs text-gray-400">user@example.com</p>
                    </div>
                    <Settings size={18} className="text-gray-400"/>
                </div>
            </div>
        </motion.div>
    );
};

const WelcomeScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.7, type: "spring" }}
            className="w-24 h-24 mb-6 bg-gradient-to-br from-electric-cyan to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-lg shadow-electric-cyan/10">
            <Bot size={50} className="text-ink" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-200 mb-2">مساعد الذكاء الاصطناعي</h1>
        <p className="text-lg text-gray-400">كيف يمكنني مساعدتك اليوم؟</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <SuggestionCard icon={Code} title="اكتب كود بايثون" subtitle="لحل مشكلة الفرز السريع" />
            <SuggestionCard icon={Star} title="اقترح أفكارًا مبتكرة" subtitle="لحملة تسويقية جديدة" />
        </div>
    </div>
);

const SuggestionCard = ({ icon: Icon, title, subtitle }) => (
    <motion.div 
        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}}
        className="bg-midnight/50 p-4 rounded-lg border border-gray-700/60 cursor-pointer flex items-start gap-4">
        <Icon className="w-6 h-6 mt-1 text-electric-cyan" />
        <div>
            <h3 className="font-semibold text-gray-200">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
    </motion.div>
);


const ChatScreen = ({ chats, setChats, setChatHistory }) => {
    const { chatId } = useParams();
    const messages = chats[chatId] || [];
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, newUserMessage];
        setChats(prev => ({ ...prev, [chatId]: updatedMessages }));
        setInput('');
        setIsLoading(true);

        // If it's a new chat, update title
        if (messages.length === 0) {
            const newTitle = input.substring(0, 30) + (input.length > 30 ? '...' : '');
            setChatHistory(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle } : c));
        }

        // Fake AI Response
        setTimeout(() => {
            const aiResponse = getFakeResponse(input);
            setChats(prev => ({ ...prev, [chatId]: [...updatedMessages, { role: 'assistant', content: aiResponse }] }));
            setIsLoading(false);
        }, 1500);
    };
    
    const getFakeResponse = (userInput) => {
      const lowerInput = userInput.toLowerCase();
      if (lowerInput.includes("مرحبا")) return "أهلاً بك! كيف يمكنني مساعدتك اليوم؟";
      if (lowerInput.includes("كود")) return `بالتأكيد، إليك دالة ` + `**Fibonacci**` + ` بسيطة في بايثون:\n\n` + `'''python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

fib(100)
` + `'''` + `\n\nيمكنك تشغيل هذا الكود مباشرة.`;
      return "شكرًا لك على رسالتك. أنا نموذج لغوي كبير، تم تدريبي بواسطة جوجل. ما زلت في مرحلة التطوير، لكنني أتعلم بسرعة. يمكنني مساعدتك في العديد من المهام مثل كتابة النصوص، الترجمة، الإجابة على الأسئلة، وكتابة الأكواد البرمجية.";
    }

    return (
        <div className="flex-1 flex flex-col h-full max-h-screen">
            <div id="chat-container" className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <ChatMessage key={i} message={msg} />
                    ))}
                </AnimatePresence>
                {isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            <div className="px-6 pb-6">
                <form onSubmit={handleSend} className="relative">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    > 
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="أرسل رسالة..."
                            className="w-full bg-midnight/80 backdrop-blur-sm border border-electric-cyan/20 rounded-lg text-gray-200 placeholder-gray-500 px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 transition-all duration-300"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="absolute left-4 top-1/2 -translate-y-1/2 text-electric-cyan disabled:text-gray-600 hover:scale-110 transition-transform">
                            <Send />
                        </button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

const LoadingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 bg-midnight rounded-full flex items-center justify-center border border-electric-cyan/20">
            <Bot size={22} className="text-electric-cyan" />
        </div>
        <div className="flex items-center gap-1.5">
            <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-electric-cyan/60 rounded-full" />
            <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-2 h-2 bg-electric-cyan/60 rounded-full" />
            <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-2 h-2 bg-electric-cyan/60 rounded-full" />
        </div>
    </motion.div>
)


const ChatMessage = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
            
            {!isUser && (
                <div className="w-10 h-10 flex-shrink-0 bg-midnight rounded-full flex items-center justify-center border border-electric-cyan/20">
                    <Bot size={22} className="text-electric-cyan" />
                </div>
            )}
            
            <div className={`max-w-xl p-4 rounded-2xl ${isUser ? 'bg-electric-cyan/10 text-gray-200 rounded-br-none' : 'bg-midnight/60 text-gray-300 rounded-bl-none'}`}>
                <MarkdownRenderer content={message.content} />
            </div>

            {isUser && (
                <div className="w-10 h-10 flex-shrink-0 bg-midnight rounded-full flex items-center justify-center border border-gray-700">
                    <User size={22} className="text-gray-400" />
                </div>
            )}
        </motion.div>
    );
};

const MarkdownRenderer = ({ content }) => {
    const renderCodeBlock = (lang, code) => {
        return (
            <div className="bg-ink/70 rounded-md my-4 text-right">
                <div className="flex justify-between items-center text-xs px-3 py-1.5 bg-midnight/50 rounded-t-md">
                    <span className="text-gray-400">{lang}</span>
                    <button className="text-gray-400 hover:text-electric-cyan flex items-center gap-1.5">
                        <CornerDownLeft size={14} />
                        <span>نسخ الكود</span>
                    </button>
                </div>
                <pre className="p-3 text-sm font-mono overflow-x-auto custom-scrollbar-h text-left" dir="ltr"><code>{code.trim()}</code></pre>
            </div>
        );
    };

    const parts = content.split(/('''[a-zA-Z]*\n[\s\S]*?\n''')/g);

    return (
        <div className="prose prose-invert prose-p:my-2 prose-headings:my-3">
            {parts.map((part, index) => {
                const codeMatch = part.match(/'''([a-zA-Z]*)\n([\s\S]*?)\n'''/);
                if (codeMatch) {
                    return renderCodeBlock(codeMatch[1] || 'code', codeMatch[2]);
                }

                const lines = part.split('\n').map((line, lineIndex) => {
                    let processedLine = line.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>'); 
                    processedLine = processedLine.replace(/\* ([\s\S]+)/g, '<li class="my-1">$1</li>');
                    if (line.trim().startsWith('*')) {
                       return <ul className="list-disc list-inside my-2" key={lineIndex} dangerouslySetInnerHTML={{ __html: processedLine }}></ul>;
                    }
                    return <p key={lineIndex} dangerouslySetInnerHTML={{ __html: processedLine }}></p>;
                });

                return <div key={index}>{lines}</div>;
            })}
        </div>
    );
};


createRoot(document.getElementById("root")).render(<App />);
'''