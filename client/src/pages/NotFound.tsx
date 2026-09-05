import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "var(--ink)", color: "var(--foreground)" }}>
      <Card className="w-full max-w-lg mx-4 shadow-lg border bg-card">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "rgba(185,242,39,.12)" }} />
              <AlertCircle className="relative h-16 w-16" style={{ color: "var(--green)" }} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">Səhifə tapılmadı</h2>
          <p className="mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
            Axtardığın siqnal burada deyil.
            <br />
            Ana səhifəyə qayıt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setLocation("/")} className="px-6 py-2.5">
              <Home className="w-4 h-4 mr-2" />
              Ana səhifə
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
