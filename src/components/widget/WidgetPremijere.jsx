
import React from "react";

import PremijereLayout from "../post/layout/PremijereLayout";

const WidgetPremijere = ({ premijere }) => {

    return (
        <div className="category-widget m-b-xs-40">
            <div className="widget-title">
                <h3>Predstojeće premijere</h3>
            </div>
            <div className="widget-body">
                {premijere.map((pred) =>
                    <PremijereLayout data={pred} pClass="" key={`pred${pred.predstavaid}`} />)}
            </div>

        </div>

    );
};

export default WidgetPremijere;
