import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NeedCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "Immediate" | "This Week" | "Flexible";
  location: string;
  estimatedTime: string;
  postedBy: string;
  postedAt: string;
  onVolunteer: (id: string) => void;
}

const urgencyColors = {
  "Immediate": "bg-destructive text-destructive-foreground",
  "This Week": "bg-accent text-accent-foreground", 
  "Flexible": "bg-secondary text-secondary-foreground"
};

export function NeedCard({
  id,
  title,
  description,
  category,
  urgency,
  location,
  estimatedTime,
  postedBy,
  postedAt,
  onVolunteer
}: NeedCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/needs/${id}`);
  };

  return (
    <Card className="shadow-gentle hover:shadow-card transition-all duration-200 border-border h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <Badge className={urgencyColors[urgency]}>
              {urgency}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {postedAt}
          </div>
        </div>
        <CardTitle 
          className="text-lg leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={handleViewDetails}
        >
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Posted by {postedBy}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button 
          variant="hero" 
          size="sm" 
          className="flex-1"
          onClick={() => onVolunteer(id)}
        >
          I Can Help
        </Button>
      </CardFooter>
    </Card>
  );
}