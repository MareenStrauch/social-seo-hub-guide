import { Toaster } from "@/components/ui/toaster";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Videos from "./pages/Videos";
import GuideYouTubeSeo from "./pages/GuideYouTubeSeo";
import GuideChatGptMarketing from "./pages/GuideChatGptMarketing";
import GuideTikTokSeo from "./pages/GuideTikTokSeo";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieBanner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guides" element={<Hub />} />
          <Route path="/guides/youtube-seo-2025" element={<GuideYouTubeSeo />} />
          <Route path="/guides/chatgpt-marketing-roi-prompt" element={<GuideChatGptMarketing />} />
          <Route path="/guides/tiktok-seo-2025" element={<GuideTikTokSeo />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          {/* Old routes redirect */}
          <Route path="/hub/youtube-seo" element={<GuideYouTubeSeo />} />
          <Route path="/hub/chatgpt-marketing" element={<GuideChatGptMarketing />} />
          <Route path="/hub/tiktok-seo" element={<GuideTikTokSeo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
