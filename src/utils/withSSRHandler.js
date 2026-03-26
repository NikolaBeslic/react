export function withSSRHandler(ssrFn) {
    return async (context) => {
        try {
            return await ssrFn(context);
        } catch (error) {
            console.error(error);
            if (error.response) {
                const status = error.response.status;
                console.error(error.response);

                // 🔹 404 → Next.js built-in 404 page
                if (status === 404) {
                    return { notFound: true };
                }

                // 🔹 401/403 → redirect to login
                if (status === 401 || status === 403) {
                    return {
                        redirect: {
                            destination: "/",
                            permanent: false,
                        },
                    };
                }

                // 🔹 500 → custom error page
                if (status >= 500) {
                    return {
                        redirect: {
                            destination: "/500",
                            permanent: false,
                        },
                    };
                }
            }

            // fallback: throw, so Next.js shows its generic error
            throw error;
        }
    };
}
