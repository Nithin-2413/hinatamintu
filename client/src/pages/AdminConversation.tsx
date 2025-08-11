import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useParams } from 'wouter';
import { ArrowLeft, Send, Calendar, Mail, User, Heart } from 'lucide-react';

interface Hug {
  id: string;
  Name: string;
  'Email Address': string;
  'Phone Number': number;
  'Recipient\'s Name': string;
  'Type of Message': string;
  Feelings: string;
  Story: string;
  'Specific Details': string;
  'Delivery Type': string;
  Date: string;
  Status: string;
}

interface Reply {
  id: string;
  created_at: string;
  sender_type: string;
  sender_name: string;
  message: string;
}

const AdminConversation = () => {
  const { id } = useParams();
  const [hug, setHug] = useState<Hug | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [adminName, setAdminName] = useState('Onaamika');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchConversation();
    }
  }, [id]);

  const fetchConversation = async () => {
    try {
      const response = await fetch(`/api/getConversation?hugid=${id}`);
      const result = await response.json();
      
      if (result.success) {
        setHug(result.hug);
        setReplies(result.replies);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch conversation",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async () => {
    if (!replyMessage.trim() || !id) return;

    setSending(true);
    try {
      const response = await fetch('/api/sendReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hugid: id,
          message: replyMessage,
          admin_name: adminName,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Add the new reply to the UI immediately
        const newReply: Reply = {
          id: result.reply.id,
          created_at: result.reply.created_at,
          sender_type: 'admin',
          sender_name: adminName,
          message: replyMessage,
        };
        setReplies([...replies, newReply]);
        setReplyMessage('');
        
        toast({
          title: "Reply Sent",
          description: "Your reply has been sent to the client",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send reply",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to send reply",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading conversation...</div>
      </div>
    );
  }

  if (!hug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Conversation not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <h1 className="text-3xl font-bold great-vibes-font bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Conversation with {hug.Name}
          </h1>
        </div>

        {/* Hug Details Card */}
        <Card className="mb-8 border-pink-200">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Client Name</Label>
                  <p className="font-semibold">{hug.Name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p>{hug['Email Address']}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p>{hug['Phone Number']}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Message Type</Label>
                  <p>{hug['Type of Message']}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Recipient</Label>
                  <p className="font-semibold">{hug['Recipient\'s Name']}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Delivery Type</Label>
                  <p>{hug['Delivery Type']}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date Submitted</Label>
                  <p>{new Date(hug.Date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {hug.Status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Feelings</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{hug.Feelings}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Story</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{hug.Story}</p>
              </div>
              {hug['Specific Details'] && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Specific Details</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{hug['Specific Details']}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Thread */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {replies.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No replies yet. Start the conversation!</p>
            ) : (
              replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`flex ${reply.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      reply.sender_type === 'admin'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {reply.sender_name} ({reply.sender_type})
                    </div>
                    <div className="text-sm">{reply.message}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {new Date(reply.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Reply Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Admin Name</Label>
              <Input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
              />
            </div>
            <Button
              onClick={sendReply}
              disabled={!replyMessage.trim() || sending}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600"
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? 'Sending...' : 'Send Reply'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminConversation;