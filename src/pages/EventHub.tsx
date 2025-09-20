import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Church, 
  Heart, 
  Music, 
  Book, 
  Coffee, 
  Gamepad2,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Filter,
  Briefcase,
  Baby,
  GraduationCap,
  HandHeart
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  banner_image_url?: string;
  location_text: string;
  start_datetime: string;
  end_datetime: string;
  organizer_name: string;
  attending_count: number;
  interested_count: number;
  volunteer_slots_total: number;
  volunteer_slots_filled: number;
  donation_total: number;
}

const categories = [
  { id: "all", name: "All Events", icon: Calendar, color: "default" },
  { id: "service", name: "Service", icon: HandHeart, color: "destructive" },
  { id: "prayer", name: "Prayer", icon: Church, color: "secondary" },
  { id: "social", name: "Social", icon: Coffee, color: "outline" },
  { id: "fundraiser", name: "Fundraiser", icon: DollarSign, color: "default" },
  { id: "workshops", name: "Workshops", icon: GraduationCap, color: "secondary" },
  { id: "youth", name: "Youth", icon: Gamepad2, color: "outline" },
  { id: "children", name: "Children", icon: Baby, color: "default" },
  { id: "worship", name: "Worship", icon: Music, color: "secondary" },
  { id: "study", name: "Study", icon: Book, color: "outline" },
  { id: "leadership", name: "Leadership", icon: Briefcase, color: "default" }
];

export default function EventHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      
      // For now, we'll use mock data since the database tables are new
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Community Service Marathon",
          description: "Join us for a full day of serving our community through multiple service projects including food bank volunteering, park cleanup, and helping local families.",
          category: "service",
          featured: true,
          banner_image_url: "/api/placeholder/800/300",
          location_text: "Multiple Locations",
          start_datetime: "2024-04-15T09:00:00Z",
          end_datetime: "2024-04-15T17:00:00Z",
          organizer_name: "Community Outreach Team",
          attending_count: 127,
          interested_count: 45,
          volunteer_slots_total: 50,
          volunteer_slots_filled: 38,
          donation_total: 2450.00
        },
        {
          id: "2",
          title: "Prayer & Fasting Retreat",
          description: "A powerful time of prayer, fasting, and seeking God's face together as a church family.",
          category: "prayer",
          featured: false,
          location_text: "Church Sanctuary",
          start_datetime: "2024-04-08T18:00:00Z",
          end_datetime: "2024-04-08T21:00:00Z",
          organizer_name: "Prayer Ministry",
          attending_count: 89,
          interested_count: 23,
          volunteer_slots_total: 12,
          volunteer_slots_filled: 10,
          donation_total: 0
        },
        {
          id: "3",
          title: "Youth Leadership Workshop",
          description: "Empowering our young leaders with practical skills for ministry and life.",
          category: "youth",
          featured: true,
          banner_image_url: "/api/placeholder/800/300",
          location_text: "Youth Center",
          start_datetime: "2024-04-12T10:00:00Z",
          end_datetime: "2024-04-12T16:00:00Z",
          organizer_name: "Youth Pastor Mike",
          attending_count: 34,
          interested_count: 12,
          volunteer_slots_total: 8,
          volunteer_slots_filled: 6,
          donation_total: 890.00
        },
        {
          id: "4",
          title: "Easter Sunrise Service",
          description: "Celebrate the resurrection with a beautiful sunrise service followed by breakfast fellowship.",
          category: "worship",
          featured: true,
          location_text: "Church Garden",
          start_datetime: "2024-04-21T06:30:00Z",
          end_datetime: "2024-04-21T09:00:00Z",
          organizer_name: "Worship Team",
          attending_count: 156,
          interested_count: 67,
          volunteer_slots_total: 25,
          volunteer_slots_filled: 23,
          donation_total: 0
        },
        {
          id: "5",
          title: "Marriage Enrichment Workshop",
          description: "Strengthen your marriage with biblical principles and practical tools.",
          category: "workshops",
          featured: false,
          location_text: "Fellowship Hall",
          start_datetime: "2024-04-19T19:00:00Z",
          end_datetime: "2024-04-19T21:30:00Z",
          organizer_name: "Marriage Ministry",
          attending_count: 28,
          interested_count: 15,
          volunteer_slots_total: 4,
          volunteer_slots_filled: 4,
          donation_total: 0
        },
        {
          id: "6",
          title: "Children's Easter Egg Hunt",
          description: "Fun-filled Easter celebration for children with games, prizes, and the Easter story.",
          category: "children",
          featured: false,
          location_text: "Church Playground",
          start_datetime: "2024-04-20T14:00:00Z",
          end_datetime: "2024-04-20T16:00:00Z",
          organizer_name: "Children's Ministry",
          attending_count: 73,
          interested_count: 29,
          volunteer_slots_total: 15,
          volunteer_slots_filled: 12,
          donation_total: 450.00
        }
      ];

      setEvents(mockEvents);
      setFeaturedEvents(mockEvents.filter(e => e.featured));
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeUntilEvent = (startDatetime: string) => {
    const now = new Date();
    const eventDate = new Date(startDatetime);
    const diffInHours = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours`;
    } else {
      const days = Math.ceil(diffInHours / 24);
      return `${days} days`;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || Calendar;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "default";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Event Hub</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover, connect, and serve through our vibrant community events
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-sm text-white/80">Upcoming Events</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.attending_count, 0)}</div>
              <div className="text-sm text-white/80">Total Attending</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.volunteer_slots_filled, 0)}</div>
              <div className="text-sm text-white/80">Volunteers Serving</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">${events.reduce((sum, e) => sum + e.donation_total, 0).toLocaleString()}</div>
              <div className="text-sm text-white/80">Raised This Month</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Star className="w-8 h-8 text-yellow-500" />
                Featured Events
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => {
                const IconComponent = getCategoryIcon(event.category);
                const progressPercentage = (event.volunteer_slots_filled / event.volunteer_slots_total) * 100;
                
                return (
                  <Card key={event.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-accent hover-lift group">
                    {event.banner_image_url && (
                      <div className="relative h-48 bg-gradient-primary">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 text-black">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-sm opacity-90">Starts in {getTimeUntilEvent(event.start_datetime)}</div>
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                        <Badge variant={getCategoryColor(event.category) as any}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.start_datetime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {event.location_text}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.attending_count} attending • {event.interested_count} interested
                        </div>
                      </div>

                      {/* Volunteer Progress */}
                      {event.volunteer_slots_total > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Volunteer Spots</span>
                            <span>{event.volunteer_slots_filled}/{event.volunteer_slots_total}</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}

                      <Link to={`/events/${event.id}`}>
                        <Button className="w-full group">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Search and Filter Bar */}
        <Card className="mb-8 border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
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
              
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((category) => {
                  const IconComponent = category.icon;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name}
                    </Button>
                  );
                })}
                
                {categories.length > 6 && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    More
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all" ? "All Events" : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-muted-foreground ml-2">({filteredEvents.length})</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const IconComponent = getCategoryIcon(event.category);
              const progressPercentage = event.volunteer_slots_total > 0 
                ? (event.volunteer_slots_filled / event.volunteer_slots_total) * 100 
                : 0;
              
              return (
                <Card key={event.id} className="border-0 shadow-card hover:shadow-accent hover-lift group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getCategoryColor(event.category) as any}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                        {event.featured && (
                          <Badge className="bg-yellow-500 text-black">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.start_datetime).toLocaleDateString()} at {new Date(event.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location_text}
                      </div>
                    </div>

                    {/* Event Stats */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{event.attending_count}</span>
                        </div>
                        {event.volunteer_slots_total > 0 && (
                          <div className="flex items-center gap-1">
                            <HandHeart className="w-4 h-4 text-muted-foreground" />
                            <span>{event.volunteer_slots_filled}/{event.volunteer_slots_total}</span>
                          </div>
                        )}
                        {event.donation_total > 0 && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span>${event.donation_total.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getTimeUntilEvent(event.start_datetime)} away
                      </div>
                    </div>

                    {/* Volunteer Progress */}
                    {event.volunteer_slots_total > 0 && (
                      <div className="mb-4">
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {event.volunteer_slots_total - event.volunteer_slots_filled} volunteer spots remaining
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Link to={`/events/${event.id}`}>
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <p className="text-xs text-muted-foreground text-center">
                        Organized by {event.organizer_name}
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
              <p className="text-muted-foreground">Try adjusting your search criteria or browse different categories</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}