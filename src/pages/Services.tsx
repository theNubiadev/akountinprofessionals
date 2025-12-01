import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
// import Services from "@/components/Services"
import Services from "@/components/Services.tsx";
export default function Services() {
    return (
        <>
            <div className="min-h-screen ">
                <Navbar />
                {/* <Services /> */}
                <Services />
                <Footer />
            </div>
        </>
    )
}