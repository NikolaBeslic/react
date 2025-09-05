import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const SearchResult = ({ data }) => {
    return (
        <Link href={`/${data.kategorija_slug}/${data.slug}`}>
            <div className="search-result-item">
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
                    <br />{" "}
                    <span
                        className="search-result-category"
                        style={{
                            backgroundColor: data.boja,
                        }}
                    >
                        {data.kategorija}
                    </span>
                    {moment(data.datum)?.fromNow()}
                </div>
            </div>
        </Link>
    );
};

export default SearchResult;
