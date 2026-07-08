import AboutCta from "../components/about/AboutCta";
import AboutFaq from "../components/about/AboutFaq";
import AboutHero from "../components/about/AboutHero";
import AboutIntro from "../components/about/AboutIntro";
import AboutPositioning from "../components/about/AboutPositioning";
import AboutProcess from "../components/about/AboutProcess";
import AboutService from "../components/about/AboutService";
import AboutStats from "../components/about/AboutStats";
import AboutValues from "../components/about/AboutValues";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutStats />
      <AboutValues />
      <AboutPositioning />
      {/* <AboutProcess /> */}
      <AboutService />
      <AboutFaq />
      {/* <AboutCta /> */}
    </>
  );
}
