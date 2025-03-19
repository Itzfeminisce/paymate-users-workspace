
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { ArrowLeft, Send, MessageCircle, Mail, Phone, Clock, User, CheckCircle } from 'lucide-react';
import NavigateBack from '@/components/ui/navigate-back';
import Sidebar from '@/components/layout/Sidebar';
import Container from '@/components/layout/Container';

// Define message types
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  read: boolean;
};

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'chat' | 'email'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [saveTicket, setSaveTicket] = useState(true);

  // Mock conversation history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
    },
    {
      id: '2',
      text: 'I have a question about my subscription.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
      read: true,
    },
    {
      id: '3',
      text: 'Sure, I\'d be happy to help with your subscription. Could you please provide me with more details about your question?',
      sender: 'support',
      timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
      read: true,
    },
  ]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate support response after delay
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. Our support team will get back to you shortly.",
        sender: 'support',
        timestamp: new Date(),
        read: false,
      };

      setMessages(prev => [...prev, supportMessage]);

      toast({
        title: "New message received",
        description: "Support team has responded to your message.",
      });
    }, 2000);
  };

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter both subject and message.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email sent",
      description: "Your message has been sent to our support team.",
    });

    // Clear form
    setEmailSubject('');
    setEmailMessage('');
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-5 pb-16">
      {/* Desktop Sidebar */}
      <Sidebar />

      <Container description='Get help from our support team' title='Support'>
        <motion.div variants={fadeUp}>
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
              className="flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
            <Button
              variant={activeTab === 'email' ? 'default' : 'outline'}
              onClick={() => setActiveTab('email')}
              className="flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </div>

          {activeTab === 'chat' ? (
            <GlassCard className="p-0 overflow-hidden">
              <div className="bg-primary/5 p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Support Agent</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 h-[400px] overflow-y-auto">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user'
                            ? 'bg-primary text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}
                        >
                          <p>{message.text}</p>
                          <div
                            className={`text-xs mt-1 flex justify-between items-center ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'
                              }`}
                          >
                            <span>{formatTime(message.timestamp)}</span>
                            {message.sender === 'user' && (
                              <CheckCircle className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No messages yet</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Email Support Request</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="What is your inquiry about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="save-ticket"
                    checked={saveTicket}
                    onCheckedChange={(checked) => setSaveTicket(!!checked)}
                  />
                  <label
                    htmlFor="save-ticket"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save a copy of this ticket to my account
                  </label>
                </div>

                <Button onClick={handleSendEmail} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </GlassCard>
          )}
        </motion.div>

        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">support@paymate.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response time: Within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available Monday-Friday, 9am-5pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average response time: 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </div>
  );
}
