import WidgetAd from "../widget/WidgetAd";

const SidebarSkeleton = () => {
    return (
        <div className="sidebar-skeleton">
            {/* Title */}
            <WidgetAd />
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
            {/* Small text */}

            {/* Tabs */}
            <div className="skeleton-tabs">
                <div className="skeleton skeleton-tab active"></div>
                <div className="skeleton skeleton-tab"></div>
            </div>

            {/* Posts */}
            <div className="skeleton skeleton-title"></div>

            {[1, 2, 3, 4].map((item) => (
                <div className="skeleton-post" key={item}>
                    <div className="skeleton skeleton-image"></div>

                    <div className="skeleton-post-content">
                        <div className="skeleton skeleton-tag"></div>
                        <div className="skeleton skeleton-line"></div>
                        <div className="skeleton skeleton-line short"></div>
                        <div className="skeleton skeleton-meta"></div>
                    </div>
                </div>
            ))}

            {/* Premijere */}
            <div className="skeleton skeleton-title"></div>

            {[1, 2, 3, 4].map((item) => (
                <div className="skeleton-post" key={item}>
                    <div className="skeleton skeleton-image"></div>

                    <div className="skeleton-post-content">
                        <div className="skeleton skeleton-tag"></div>
                        <div className="skeleton skeleton-line"></div>
                        <div className="skeleton skeleton-line short"></div>
                        <div className="skeleton skeleton-meta"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SidebarSkeleton;
