import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CollectionHighlights from "./components/CollectionHighlights";
import Experience from "./components/Experience";
import FeaturedNiqabs from "./components/FeaturedNiqabs";
import CustomerReviews from "./components/CustomerReviews";
import MiniAbout from "./components/MiniAbout";
import Footer from "./components/Footer";

export default function Home() {
  return (<>
      <Navbar />
      <Hero />
      <CollectionHighlights />
      <Experience />
      <FeaturedNiqabs />
      <CustomerReviews />
      <MiniAbout />
      <Footer />
      </>
  );
}
