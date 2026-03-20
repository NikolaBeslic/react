import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const SearchResult = ({ data, onNavigate }) => {
    return (
        <Link href={`/${data.kategorija_slug}/${data.slug}`}>
            <div className="search-result-item" onClick={onNavigate}>
                <div className="search-result-photo">
                    <Image
                        src={data.photo ?? ""}
                        alt={data.naslov}
                        objectFit="cover"
                        height={60}
                        width={60}
                    />
                </div>
                <div className="search-result-info">
                    <span className="search-result-title">{data.naslov}</span>

                    <div className="search-result-meta">
                        <span
                            className="search-result-category"
                            style={{ backgroundColor: data.boja }}
                        >
                            {data.kategorija}
                        </span>

                        <span className="search-result-date">
                            {moment(data.datum)?.fromNow()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResult;
