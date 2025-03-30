import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import {AboutUs, shortDescription} from "@/Data/AboutUs";

const AboutUsPage=(props)=>{
    return(
      <>
      <Navbar/>
          <PageContainer
              title="من نحن"
              data={AboutUs}
              shortDescription={shortDescription}
          />
          <Footer/>
      </>
    )
}
export default AboutUsPage