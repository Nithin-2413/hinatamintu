import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { Eye, Calendar, Mail, User } from 'lucide-react';

interface Hug {
  id: string;
  Name: string;
  'Email Address': string;
  Date: string;
  Status: string;
  'Type of Message': string;
  'Recipient\'s Name': string;
  Feelings: string;
}

const AdminOrders = () => {
  const [hugs, setHugs] = useState<Hug[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const { toast } = useToast();

  const authenticate = () => {
    if (password === 'admin123') { // Simple password check
      setAuthenticated(true);
      fetchHugs();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive"
      });
    }
  };

  const fetchHugs = async () => {
    try {
      const response = await fetch('/api/getHugs');
      const result = await response.json();
      
      if (result.success) {
        setHugs(result.hugs);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch orders",
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

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl great-vibes-font bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            />
            <Button onClick={authenticate} className="w-full bg-gradient-to-r from-pink-600 to-purple-600">
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold great-vibes-font bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Orders Dashboard
          </h1>
          <Link href="/">
            <Button variant="outline">Back to Website</Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {hugs.map((hug) => (
            <Card key={hug.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-pink-600" />
                      <span className="font-semibold">{hug.Name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{hug['Email Address']}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium">{hug['Type of Message']}</div>
                    <div className="text-sm text-muted-foreground">For: {hug['Recipient\'s Name']}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(hug.Date).toLocaleDateString()}</span>
                    </div>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                      hug.Status === 'New' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {hug.Status}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link href={`/admin/${hug.id}`}>
                      <Button size="sm" className="bg-gradient-to-r from-pink-600 to-purple-600">
                        <Eye className="h-4 w-4 mr-2" />
                        View Conversation
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {hug.Feelings?.substring(0, 150)}...
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hugs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;