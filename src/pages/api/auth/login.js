import * as cookie from "cookie";
import axiosClient from "../../../utils/axios";

export default async function handler(req, res) {
    console.log("Login API called");
    if (req.method !== "POST") return res.status(405).end();
    const csrf = () => axiosClient.get("/csrf-cookie");

    await csrf(); // Ensure CSRF token is set before making the login request

    const { email, password } = req.body;

    try {
        const response = await axiosClient.post(`/login`, { email, password });
        const token = response.data.token;

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: false,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );

        res.status(200).json(response.data.user);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid credentials" });
    }
}
