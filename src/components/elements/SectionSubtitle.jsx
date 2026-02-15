import Link from "next/link";

const SectionSubtitle = ({ title, btnText, btnUrl, pClass }) => {
    return (
        <div
            className={`section-title section-subtitle ${pClass ?? "m-b-xs-40"}`}
        >
            <h4>{title}</h4>
            <Link href={btnUrl ?? "#"} className="btn-link" component={Link}>
                {btnText}
            </Link>
        </div>
    );
};

export default SectionSubtitle;
