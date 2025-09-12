import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, MapPin, Users, Search, Church, Heart, Music, Book, Coffee, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllChurchEvents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allEvents = [
    {
      id: 1,
      title: "Community Service Day",
      description: "Join our church family as we serve at the local food bank and clean up the community park. Bring gloves and a heart to serve!",
      date: "March 25, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Community Center",
      attendees: 23,
      category: "Service",
      icon: Heart,
      organizer: "Ministry Team"
    },
    {
      id: 2,
      title: "Prayer & Fasting",
      description: "Special prayer meeting for our church members in need. Let's come together in spiritual support and intercession.",
      date: "March 28, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Church Sanctuary",
      attendees: 45,
      category: "Prayer",
      icon: Church,
      organizer: "Pastor Michael"
    },
    {
      id: 3,
      title: "Youth Game Night",
      description: "Fun evening for our youth with board games, video games, pizza, and fellowship. Ages 13-18 welcome!",
      date: "April 2, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Youth Center",
      attendees: 18,
      category: "Youth",
      icon: Gamepad2,
      organizer: "Youth Ministry"
    },
    {
      id: 4,
      title: "Women's Bible Study",
      description: "Weekly Bible study focusing on the book of Proverbs. All women are welcome to join our growing study group.",
      date: "April 5, 2024",
      time: "10:00 AM - 11:30 AM",
      location: "Fellowship Hall",
      attendees: 32,
      category: "Study",
      icon: Book,
      organizer: "Women's Ministry"
    },
    {
      id: 5,
      title: "Easter Sunrise Service",
      description: "Celebrate the resurrection of our Lord with a special sunrise service followed by breakfast fellowship.",
      date: "April 7, 2024",
      time: "6:30 AM - 9:00 AM",
      location: "Church Garden",
      attendees: 89,
      category: "Worship",
      icon: Church,
      organizer: "Worship Team"
    },
    {
      id: 6,
      title: "Men's Coffee & Fellowship",
      description: "Monthly gathering for men to connect, share testimonies, and support one another in faith and life.",
      date: "April 12, 2024",
      time: "7:00 AM - 8:30 AM",
      location: "Coffee Shop",
      attendees: 15,
      category: "Fellowship",
      icon: Coffee,
      organizer: "Men's Ministry"
    },
    {
      id: 7,
      title: "Children's Easter Program",
      description: "Our children will present a special Easter program with songs, skits, and the Easter story. Family event!",
      date: "April 14, 2024",
      time: "11:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      attendees: 67,
      category: "Family",
      icon: Music,
      organizer: "Children's Ministry"
    },
    {
      id: 8,
      title: "Church Picnic",
      description: "Annual church family picnic with games, food, and fellowship. Bring a side dish to share and enjoy time together!",
      date: "April 21, 2024",
      time: "12:00 PM - 4:00 PM",
      location: "City Park",
      attendees: 124,
      category: "Fellowship",
      icon: Heart,
      organizer: "Fellowship Committee"
    }
  ];

  const categories = ["All", "Service", "Prayer", "Youth", "Study", "Worship", "Fellowship", "Family"];
  
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Service": return "default";
      case "Prayer": return "secondary";
      case "Youth": return "outline";
      case "Study": return "default";
      case "Worship": return "secondary";
      case "Fellowship": return "outline";
      case "Family": return "default";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/my-church">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Church
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">All Church Events</h1>
          <p className="text-xl text-white/90">
            Complete calendar of upcoming church activities and gatherings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-elegant bg-card">
          <CardHeader>
            <CardTitle>Search & Filter Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search events by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
          </h2>
          <Badge variant="secondary" className="text-sm">
            {allEvents.length} Total Upcoming
          </Badge>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const IconComponent = event.icon;
            return (
              <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift bg-card backdrop-blur-sm group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <Badge variant={getCategoryColor(event.category) as any}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                      Join Event
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Organized by {event.organizer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}