"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { convertUnicodeToAps } from "@/lib/converter";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [unicodeText, setUnicodeText] = useState("");
  const [apsText, setApsText] = useState("");
  const { toast } = useToast();

  const handleConvert = () => {
    if (!unicodeText.trim()) {
      toast({
        title: "Input is empty",
        description: "Please enter some Unicode text to convert.",
        variant: "destructive",
      });
      return;
    }
    const convertedText = convertUnicodeToAps(unicodeText);
    setApsText(convertedText);
    toast({
      title: "Conversion Complete",
      description: "Unicode text has been converted to APS format.",
    });
  };

  const handleCopy = () => {
    if (!apsText) return;
    navigator.clipboard.writeText(apsText).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "The APS text has been copied successfully.",
      });
    });
  };
  
  const handleUnicodeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUnicodeText(e.target.value);
    if(e.target.value === "") {
        setApsText("");
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-card text-center p-8">
          <CardTitle className="text-4xl font-headline tracking-tight">
            Uni2APS
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Convert Unicode (Mangal) text to APS-DV-Prakash for Marathi typing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid gap-4">
            <Label htmlFor="unicode-input" className="text-base font-semibold">
              Unicode Input
            </Label>
            <Textarea
              id="unicode-input"
              placeholder="तुमचे युनिकोड मजकूर येथे पेस्ट करा..."
              value={unicodeText}
              onChange={handleUnicodeTextChange}
              className="min-h-[150px] text-base rounded-lg focus:ring-accent"
              rows={6}
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={handleConvert} size="lg" className="rounded-full px-10 py-6 text-base font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
              <RefreshCw className="mr-3 h-5 w-5 animate-spin-slow" />
              Convert to APS
            </Button>
          </div>

          <div className="grid gap-4">
             <div className="flex justify-between items-center">
                <Label htmlFor="aps-output" className="text-base font-semibold">
                APS-DV-Prakash Output
                </Label>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!apsText}
                    aria-label="Copy APS text"
                    className="h-9 w-9 text-muted-foreground hover:text-accent-foreground hover:bg-accent/20 rounded-full"
                >
                    <Copy className="h-5 w-5" />
                </Button>
            </div>
            <Textarea
              id="aps-output"
              readOnly
              value={apsText}
              placeholder="Converted APS text will appear here..."
              className="min-h-[150px] bg-secondary/50 font-aps text-xl tracking-wider rounded-lg"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
