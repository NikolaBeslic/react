import SectionTitle from "../elements/SectionTitle";
import PredstaveTwoSlider from "../slider/PredstaveTwoSlider";

const NajnovijePredstaveSection = ({ sectionTitle, predstaveData }) => {
  return (
    <div className="section-gap section-gap-top__with-text trending-stories">
      <div className="container">
        <SectionTitle title={sectionTitle} btnText="Sve predstave" />
        <div className="row">
          <div className="row gutter-40">
            <PredstaveTwoSlider predstaveData={predstaveData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NajnovijePredstaveSection;
