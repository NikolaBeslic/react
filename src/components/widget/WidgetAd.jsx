import Image from "next/image";

const WidgetAd = ({ img, height, width }) => {
    return (
        <div className="add-block-widget m-b-xs-50">
            <div className="widget-title m-b-xs-50">
                <h3>Izdvajamo</h3>
            </div>
            <a
                href="https://www.patreon.com/hocupozoriste"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src={img ?? "/slike/patreon-gif-2.gif"}
                    alt="sidebar Ad"
                    width={width ?? 320}
                    height={height ?? 287}
                    className="img-fluid"
                    unoptimized
                />
            </a>
        </div>
    );
};

export default WidgetAd;
