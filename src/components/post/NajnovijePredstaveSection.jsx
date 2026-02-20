import SectionTitle from "../elements/SectionTitle";
import PredstaveTwoSlider from "../slider/PredstaveTwoSlider";

const NajnovijePredstaveSection = ({ sectionTitle, predstaveData }) => {
    return (
        <div className="section-gap section-gap-top__with-text trending-stories p-b-xs-60">
            <div className="container">
                <SectionTitle
                    title={sectionTitle}
                    btnText="Sve predstave"
                    btnUrl="/predstave"
                />

                <div className="row gutter-40 m-t-xs-50">
                    <PredstaveTwoSlider
                        predstaveData={predstaveData}
                        key={sectionTitle}
                    />
                </div>
            </div>
        </div>
    );
};

export default NajnovijePredstaveSection;
