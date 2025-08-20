import HuPSlider from "../slider/HupSlider";
import PostSectionThree from "../post/PostSectionThree";
import PostSectionSix from "../post/PostSectionSix";
import FooterOne from "../footer/FooterOne";
import PostSectionTwo from "../post/PostSectionTwo";
import NajnovijePredstaveSection from "../post/NajnovijePredstaveSection";
import HuPkastNaslovnaSection from "../post/HuPkastNaslovnaSection";
import { useMediaQuery } from "react-responsive";
import HuPSliderMobile from "../slider/HuPSliderMobile";
import HeadMeta from "../elements/HeadMeta";

const HupHome = ({ posts, predstave }) => {
    const najnovijePredstave = predstave.najnovije;
    const najpopularnijePredstave = predstave.najpopularnije;
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <>
            <HeadMeta metaTitle="Dobrodošli" />
            {isTabletOrMobile ? (
                <HuPSliderMobile slidePost={posts} />
            ) : (
                <HuPSlider slidePost={posts} />
            )}
            <PostSectionThree postData={posts} />
            <HuPkastNaslovnaSection postData={posts} />
            <NajnovijePredstaveSection
                sectionTitle="Najpopularnije predstave"
                predstaveData={najpopularnijePredstave}
            />
            <PostSectionTwo postData={posts} />
            <NajnovijePredstaveSection
                sectionTitle="Najnovije predstave"
                predstaveData={najnovijePredstave}
            />
            <PostSectionSix postData={posts} />
        </>
    );
};

export default HupHome;
