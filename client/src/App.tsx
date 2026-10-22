import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useLocation } from "wouter";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Syllabus from "./pages/Syllabus";
import Tracks from "./pages/Tracks";

function App() {
  const [path] = useLocation();
  const isAdminRoute = path === "/admin";
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster position="bottom-right" richColors />
          {!isAdminRoute && <ScrollToTop />}
          {!isAdminRoute && <Header />}
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/haqqimizda" component={About} />
            <Route path="/istiqametler" component={Tracks} />
            <Route path="/tedris-proqrami" component={Syllabus} />
            <Route path="/layiheler" component={Projects} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/qeydiyyat" component={Join} />
            <Route path="/elaqe" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
          {!isAdminRoute && <Footer />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
