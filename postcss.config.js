const prefixer = require("postcss-prefix-selector");

module.exports = {
    plugins: {
        "postcss-prefix-selector": {
            prefix: ".user-layout",
            includeFiles: [/style\.css$/],
            transform(prefix, selector) {
                // 1️⃣ Leave :root untouched so CSS variables work
                if (selector.trim() === ":root") return selector;

                // 2️⃣ Optionally leave html/body alone if you want
                if (
                    selector.startsWith("html") ||
                    selector.startsWith("body")
                ) {
                    return selector; // leave these unprefixed
                }

                // 3️⃣ Prefix everything else
                return `${prefix} ${selector}`;
            },
        },
    },
};
