import SectionTitle from "../elements/SectionTitle";
import HuPkastIndexLayout from "./HuPkastIndexLayout";

const HuPkastNaslovnaSection = ({ postData }) => {
    const hupkasti = postData.hupkast;

    return (
        <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
            <div className="container">
                <SectionTitle
                    title="HuPkast"
                    btnText="Sve epizode"
                    btnUrl="/hupkast"
                />

                {hupkasti?.map((hupkastData) => (
                    <HuPkastIndexLayout
                        hupkastData={hupkastData}
                        isNaslovna={true}
                        key={`hpkst-nasl-${hupkastData.tekstid}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HuPkastNaslovnaSection;
