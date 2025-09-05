import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactHeader from "../components/post/post-format/elements/meta/ContactHeader";

const ContactPage = () => {
    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <ContactForm />
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;

ContactPage.getLayoutProps = (pageProps) => ({
    header: <ContactHeader />,
});
