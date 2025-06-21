"use client";

import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  convertMarathiText, 
  getAvailableFonts, 
  validateConversion,
  getFontStats 
} from "@/lib/marathi-converter";
import { Copy, RefreshCw, ArrowRight, ArrowLeft, Info, Sparkles, AlertTriangle, Flower2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MAX_WORDS = 100000; // 1 Lakh words
const MAX_CHARACTERS = 500000; // 5 Lakh characters (rough estimate)

export default function MarathiConverter() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [sourceFont, setSourceFont] = useState("unicode");
  const [targetFont, setTargetFont] = useState("aps-dv-prakash");
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const availableFonts = getAvailableFonts();

  // Calculate word and character counts
  const wordCount = useMemo(() => {
    return sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;
  }, [sourceText]);

  const characterCount = useMemo(() => {
    return sourceText.length;
  }, [sourceText]);

  const isOverLimit = wordCount > MAX_WORDS || characterCount > MAX_CHARACTERS;

  const handleConvert = (direction: 'forward' | 'backward') => {
    if (!sourceText.trim()) {
      toast({
        title: "Input is empty",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    if (isOverLimit) {
      toast({
        title: "Text too long",
        description: `Maximum allowed is ${MAX_WORDS.toLocaleString()} words or ${MAX_CHARACTERS.toLocaleString()} characters.`,
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    try {
      let result: string;
      
      if (direction === 'forward') {
        result = convertMarathiText(sourceText, sourceFont, targetFont);
      } else {
        result = convertMarathiText(sourceText, targetFont, sourceFont);
      }

      setTargetText(result);
      
      toast({
        title: "Conversion Complete",
        description: `Successfully converted ${wordCount.toLocaleString()} words from ${getFontDisplayName(sourceFont)} to ${getFontDisplayName(targetFont)}.`,
      });

      // Validate conversion
      const isValid = validateConversion(sourceText, sourceFont, targetFont);
      if (!isValid) {
        console.warn("Conversion validation failed - some characters may not have been converted correctly");
      }

    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "The converted text has been copied successfully.",
      });
    });
  };

  const handleSourceTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setSourceText(newText);
    if (newText === "") {
      setTargetText("");
    }
  };

  const handleFontChange = (type: 'source' | 'target', value: string) => {
    if (type === 'source') {
      setSourceFont(value);
    } else {
      setTargetFont(value);
    }
    // Clear target text when fonts change
    setTargetText("");
  };

  const getFontDisplayName = (fontName: string) => {
    const font = availableFonts.find(f => f.name === fontName);
    return font?.displayName || fontName;
  };

  const getFontStatsInfo = (fontName: string) => {
    return getFontStats(fontName);
  };

  const formatCount = (count: number) => {
    if (count >= 100000) {
      return `${(count / 100000).toFixed(1)} Lakh`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <TooltipProvider>
      <main className="ancient-bg flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-8 relative">
        <Card className="ancient-card w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden ancient-pulse relative z-10">
          <CardHeader className="text-center p-8 relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="ancient-icon h-8 w-8 animate-pulse" />
              <CardTitle className="ancient-title text-4xl font-headline tracking-tight">
                मराठी अक्षर परिवर्तक
              </CardTitle>
              <Sparkles className="ancient-icon h-8 w-8 animate-pulse" />
            </div>
            <CardDescription className="ancient-subtitle text-lg mt-2">
              Convert between Unicode and various Marathi fonts with ancient wisdom
            </CardDescription>
            <div className="mt-4 p-3 ancient-stats rounded-lg relative">
              <div className="flex items-center justify-center gap-2">
                <Flower2 className="ancient-icon h-4 w-4" />
                <p className="ancient-subtitle text-sm">
                  <span className="text-indian-gold font-semibold">Capacity:</span> Up to {formatCount(MAX_WORDS)} words per conversion
                </p>
                <Flower2 className="ancient-icon h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Font Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="source-font" className="ancient-subtitle text-base font-semibold flex items-center gap-2">
                  Source Font
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="ancient-icon h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="ancient-tooltip">
                      <p>Select the font of your input text</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select value={sourceFont} onValueChange={(value) => handleFontChange('source', value)}>
                  <SelectTrigger className="ancient-select">
                    <SelectValue placeholder="Select source font" />
                  </SelectTrigger>
                  <SelectContent className="ancient-tooltip">
                    {availableFonts.map((font) => (
                      <SelectItem key={font.name} value={font.name} className="hover:bg-yellow-900/20">
                        {font.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-font" className="ancient-subtitle text-base font-semibold flex items-center gap-2">
                  Target Font
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="ancient-icon h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="ancient-tooltip">
                      <p>Select the font you want to convert to</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select value={targetFont} onValueChange={(value) => handleFontChange('target', value)}>
                  <SelectTrigger className="ancient-select">
                    <SelectValue placeholder="Select target font" />
                  </SelectTrigger>
                  <SelectContent className="ancient-tooltip">
                    {availableFonts.map((font) => (
                      <SelectItem key={font.name} value={font.name} className="hover:bg-yellow-900/20">
                        {font.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="source-input" className="ancient-subtitle text-base font-semibold">
                    {getFontDisplayName(sourceFont)} Input
                  </Label>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`ancient-subtitle ${isOverLimit ? 'text-indian-red' : 'text-indian-silver'}`}>
                      {formatCount(wordCount)} words
                    </span>
                    <span className={`ancient-subtitle ${isOverLimit ? 'text-indian-red' : 'text-indian-silver'}`}>
                      {formatCount(characterCount)} chars
                    </span>
                    {isOverLimit && (
                      <AlertTriangle className="ancient-icon h-4 w-4 text-indian-red" />
                    )}
                  </div>
                </div>
                <Textarea
                  id="source-input"
                  placeholder={`Enter your ${getFontDisplayName(sourceFont)} text here... (Max ${formatCount(MAX_WORDS)} words)`}
                  value={sourceText}
                  onChange={handleSourceTextChange}
                  className={`ancient-input min-h-[200px] text-base rounded-lg focus:ring-accent ${
                    isOverLimit ? 'border-indian-red shadow-red-500/20' : ''
                  }`}
                  rows={8}
                  maxLength={MAX_CHARACTERS}
                />
                {isOverLimit && (
                  <div className="ancient-stats border-indian-red">
                    <p className="text-indian-red text-sm font-medium">
                      ⚠️ Text exceeds limit: {formatCount(wordCount)} words / {formatCount(characterCount)} characters
                    </p>
                    <p className="text-indian-red/80 text-xs mt-1">
                      Maximum allowed: {formatCount(MAX_WORDS)} words or {formatCount(MAX_CHARACTERS)} characters
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="target-output" className="ancient-subtitle text-base font-semibold">
                    {getFontDisplayName(targetFont)} Output
                  </Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!targetText}
                    aria-label="Copy converted text"
                    className="ancient-icon h-9 w-9 hover:bg-yellow-900/20 rounded-full"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
                <Textarea
                  id="target-output"
                  readOnly
                  value={targetText}
                  placeholder="Converted text will appear here..."
                  className="ancient-input min-h-[200px] text-xl tracking-wider rounded-lg"
                  rows={8}
                />
                {targetText && (
                  <div className="ancient-stats">
                    <p className="text-indian-silver text-sm">
                      Converted: {formatCount(targetText.trim().split(/\s+/).length)} words, {formatCount(targetText.length)} characters
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Conversion Buttons */}
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => handleConvert('forward')} 
                size="lg" 
                className="ancient-button rounded-full px-8 py-6 text-base font-bold shadow-lg transform hover:scale-105 transition-transform duration-200"
                disabled={isConverting || isOverLimit}
              >
                {isConverting ? (
                  <div className="ancient-spin mr-3 h-5 w-5" />
                ) : (
                  <RefreshCw className="mr-3 h-5 w-5" />
                )}
                Convert Forward
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>

              <Button 
                onClick={() => handleConvert('backward')} 
                size="lg" 
                variant="outline"
                className="ancient-button rounded-full px-8 py-6 text-base font-bold shadow-lg transform hover:scale-105 transition-transform duration-200"
                disabled={isConverting || isOverLimit}
              >
                <ArrowLeft className="mr-3 h-5 w-5" />
                Convert Backward
                {isConverting ? (
                  <div className="ancient-spin ml-3 h-5 w-5" />
                ) : (
                  <RefreshCw className="ml-3 h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Font Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 ancient-border rounded-lg p-4">
              <div className="ancient-stats">
                <h3 className="ancient-subtitle text-lg font-semibold mb-3">Source Font Stats</h3>
                <div className="text-sm text-yellow-200/80">
                  <p className="mb-1">Font: {getFontDisplayName(sourceFont)}</p>
                  <p className="mb-1">Total Mappings: {getFontStatsInfo(sourceFont).totalMappings}</p>
                  <p className="mb-1">Unicode to Font: {getFontStatsInfo(sourceFont).unicodeToFont}</p>
                  <p className="mb-1">Font to Unicode: {getFontStatsInfo(sourceFont).fontToUnicode}</p>
                </div>
              </div>

              <div className="ancient-stats">
                <h3 className="ancient-subtitle text-lg font-semibold mb-3">Target Font Stats</h3>
                <div className="text-sm text-yellow-200/80">
                  <p className="mb-1">Font: {getFontDisplayName(targetFont)}</p>
                  <p className="mb-1">Total Mappings: {getFontStatsInfo(targetFont).totalMappings}</p>
                  <p className="mb-1">Unicode to Font: {getFontStatsInfo(targetFont).unicodeToFont}</p>
                  <p className="mb-1">Font to Unicode: {getFontStatsInfo(targetFont).fontToUnicode}</p>
                </div>
              </div>
            </div>

            {/* Ancient Wisdom Footer */}
            <div className="text-center pt-4">
              <p className="ancient-subtitle text-sm opacity-70">
                "अक्षरं मूलं मंत्रं" - Letters are the root of mantras
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  );
}
