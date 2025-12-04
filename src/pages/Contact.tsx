import ContactComponent from "@/components/ContactComponent"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function Contact() {
    return (
        <>
            <div className="min-h-screen">
                <Navbar />
                <div className="mt-8">
                    <ContactComponent />
                </div>
            <Footer />
            </div>
        </>
    )
}