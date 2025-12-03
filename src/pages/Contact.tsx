import ContactComponent from "@/components/ContactComponent"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function Contact() {
    return (
        <>
            <div className="min-h-screen">
            <Navbar />
            <ContactComponent />
            <Footer />
            </div>
        </>
    )
}