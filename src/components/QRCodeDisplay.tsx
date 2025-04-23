
import { QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  qrData: string;
  bookingId: string;
  businessName: string;
  onDownload?: () => void;
}

export function QRCodeDisplay({ 
  qrData, 
  bookingId, 
  businessName, 
  onDownload 
}: QRCodeDisplayProps) {
  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-center text-lg">Your Queue Pass</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <div className="w-48 h-48 bg-white p-3 rounded-lg flex items-center justify-center">
          <div className="relative">
            {/* Use a simple representation when actual QR code isn't available */}
            <QrCode className="w-36 h-36 text-primary" strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-primary font-mono opacity-70">{bookingId}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <p className="font-medium">{businessName}</p>
          <p className="text-sm text-muted-foreground">Booking ID: {bookingId}</p>
        </div>
        
        <div className="text-sm text-center text-muted-foreground">
          Show this QR code when you arrive at the location to check in
        </div>
        
        {onDownload && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDownload}
            className="mt-2"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Save QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
