import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { Eye, Calendar, Mail, User, LogOut, Heart, MessageSquare } from 'lucide-react';

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
  const [authenticated, setAuthenticated] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      setAuthenticated(true);
      fetchHugs();
    } else {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setLocation('/admin/login');
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
    return null; // Will redirect to login page
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold great-vibes-font bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Orders Dashboard
              </h1>
              <p className="text-rose-600 font-medium">Welcome back, {localStorage.getItem('adminUsername')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                Public Site
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-600 font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-rose-800">{hugs.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-rose-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-rose-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 font-medium">New Orders</p>
                  <p className="text-3xl font-bold text-emerald-800">
                    {hugs.filter(h => h.Status === 'New').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-rose-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 font-medium">Replied</p>
                  <p className="text-3xl font-bold text-indigo-800">
                    {hugs.filter(h => h.Status === 'Replied').length}
                  </p>
                </div>
                <Mail className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="border-rose-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-rose-100 to-pink-100 border-b border-rose-200">
            <CardTitle className="text-xl text-rose-800">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rose-50 border-b border-rose-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-rose-700">Name</th>
                    <th className="text-left p-4 font-medium text-rose-700">Date</th>
                    <th className="text-left p-4 font-medium text-rose-700">Recipient's Name</th>
                    <th className="text-left p-4 font-medium text-rose-700">Email Address</th>
                    <th className="text-left p-4 font-medium text-rose-700">Status</th>
                    <th className="text-center p-4 font-medium text-rose-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hugs.map((hug, index) => (
                    <tr 
                      key={hug.id} 
                      className={`border-b border-rose-100 hover:bg-rose-25 transition-colors cursor-pointer ${
                        index % 2 === 0 ? 'bg-white' : 'bg-rose-25'
                      }`}
                      onClick={() => window.location.href = `/admin/conversation/${hug.id}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{hug.Name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(hug.Date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="p-4 text-gray-900 font-medium">{hug['Recipient\'s Name']}</td>
                      <td className="p-4 text-gray-600">{hug['Email Address']}</td>
                      <td className="p-4">
                        <Badge 
                          variant={hug.Status === 'New' ? 'default' : 'secondary'}
                          className={hug.Status === 'New' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'}
                        >
                          {hug.Status}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Link href={`/admin/conversation/${hug.id}`}>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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